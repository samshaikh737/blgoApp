const User = require("../models/User");
const { userValidation, userDeleteValidation } = require("../validation/UserValidation");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");

const UserAuth = async (req, res, next) => {

    const { error } = userValidation(req.body);
    if (error) return res.status(500).json({ 'error': error?.message });
    if (req.body.id !== req.params.id) return res.status(401).json({ "error": "You can update only your Account!" });

    const checkusername = await User.findOne({ "username": req.body.username });
    if (checkusername) return res.status(500).json({ "error": "Username already exists" });

    const checkEmail = await User.findOne({ "email": req.body.email });
    if (checkEmail) return res.status(500).json({ "error": "Email already exists" });

    if (req.body?.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    next();
}

const UserDeleteAuth = async (req, res, next) => {
    const { error } = userDeleteValidation(req.body);
    if (error) return res.status(500).json({ 'error': error?.message });
    if (req.body.id !== req.params.id) return res.status(401).json({ "error": "You can only delete your Account!" });

    try {
        const user = await User.findOne({ "_id": req.params.id, "username": req.body.username });
        if (!user) return res.status(500).send({ "error": "User Not found" });
        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) return res.status(500).send({ "error": "Password is wrong " });

        if (user?.profilePic) {
            let img = user.profilePic?.split("/api/")[1];
            const imgPath = path.join(__dirname, `../${img}`);
            fs.unlink(imgPath, function (err) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Successfully deleted the file.")
                }
            })
        };

        const delPostImg = await Post.find({ user: user._id });
        delPostImg.filter((d) => {
            if (d?.photo) {
                let img = d.photo?.split("/api/")[1];
                const imgPath = path.join(__dirname, `../${img}`);
                fs.unlink(imgPath, function (err) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log("Successfully deleted the file.")
                    }
                })
            }
        });

        req.user = user;

    } catch (error) {
        return res.status(500).send({ "error": "User Not found" });
    }
    next();
}



module.exports = { UserAuth, UserDeleteAuth };
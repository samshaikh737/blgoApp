const Post = require("../models/Post");
const User = require("../models/User");
const { AddPostValidation, updatePostValidation } = require("../validation/PostValidation");

const addPostMidd = async (req, res, next) => {
    const { error } = AddPostValidation(req.body);
    if (error) return res.status(400).send({ "error": error.message });

    try {
        const user = await User.findById(req.body.user);
        if (!user) return res.status(400).send({ "error": "user not found Can't post " });

        req.username = user.username;
    } catch (error) {
        return res.status(400).send({ "error": "user not found Can't post " })
    }

    next()
}


const updatePostMidd = async (req, res, next) => {
    const { error } = updatePostValidation(req.body);
    if (error) return res.status(400).send({ "error": error.message });
    if (req.body.id != req.params.id) return res.status(400).send({ "error": "Post Id not found" })

    try {
        const user = await User.findById(req.body.user);
        if (!user) return res.status(400).send({ "error": "user not found Can't update " });

        try {
            const checkUserPost = await Post.findOne({ "_id": req.params.id, "user": user._id });
            if (!checkUserPost) return res.status(400).send({ "error": "You can update your Post" });
        } catch (error) {
            return res.status(400).send({ "error": "You can update your Post" });
        }

        req.username = user.username;
    } catch (error) {
        return res.status(400).send({ "error": "user not found Can't update " })
    }

    next()
}


const deletePostMidd = async (req, res, next) => {
    if (req.body.id != req.params.id) return res.status(400).send({ "error": "Post Id not found" })

    try {
        const user = await User.findById(req.body.user);
        if (!user) return res.status(400).send({ "error": "user not found Can't delete post " });

        try {
            const checkUserPost = await Post.findOne({ "_id": req.params.id, "user": user._id });
            if (!checkUserPost) return res.status(400).send({ "error": "You can only delete Your Post" });
        } catch (error) {
            return res.status(400).send({ "error": "You can only delete Your Post" });
        }
    } catch (error) {
        return res.status(400).send({ "error": "user not found Can't delete post " })
    }

    next()
}


module.exports = { addPostMidd, updatePostMidd ,deletePostMidd};
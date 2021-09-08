const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//middleware
const registerAuth = require("../middleware/RegisterAuth");
const loginAuth = require("../middleware/LoginAuth");

// Register
router.post("/register", registerAuth, async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const newUser = new User({ ...req.body, "password": hashPassword });
        const saveUser = await newUser.save();

        const { password, ...other } = newUser._doc;
        res.send(other);
    } catch (error) {
        res.status(204).send(error)
    }

});

// Login
router.post("/login", loginAuth ,async (req, res, next) => {
    const { password, ...other } = req.user._doc
    res.status(200).send(other)
});

module.exports = router;
const User = require("../models/User");
const { loginUserValidation } = require("../validation/RegisterValidation");
const bcrypt = require('bcrypt');


const loginAuth = async (req, res, next) => {

    const { error } = loginUserValidation(req.body);
    if (error) return res.status(400).json({ 'error': error.message });

    // //check user already exists
    const user = await User.findOne({ "username": req.body.username });
    if (!user) return res.status(400).json({ "error": "Username not found" });

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(400).json({ "error": "password is worng" });

    req.user = user;

    next();
}

module.exports = loginAuth;
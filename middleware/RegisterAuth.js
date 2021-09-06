const User = require("../models/User");
const { registerUserValidation } = require("../validation/RegisterValidation");

const registerAuth = async (req, res, next) => {
    const { error } = registerUserValidation(req.body);
    if (error) return res.status(400).json({ 'error': error?.message });

    // //check user already exists
    const checkusername = await User.findOne({ "username": req.body.username });
    if (checkusername) return res.status(400).json({ "error": "Username already exists" });

    const checkEmail = await User.findOne({ "email": req.body.email });
    if (checkEmail) return res.status(400).json({ "error": "Email already exists" });

    next()
}

module.exports = registerAuth;
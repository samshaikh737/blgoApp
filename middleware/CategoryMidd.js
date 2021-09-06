const Category = require("../models/Category");
const CategoryValidation = require("../validation/Category");

const CategoryMidd = async (req, res, next) => {
    const { error } = CategoryValidation(req.body);
    if (error) return res.status(400).json({ 'error': error.message });

    const checkCategory = await Category.findOne({ name: req.body.name });
    if (checkCategory) return res.status(400).send({ "error": "Category already Exists" });

    next();
}

module.exports = CategoryMidd;
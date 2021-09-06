const Category = require("../models/Category");
const Joi = require("joi");

const CategoryValidation = (data) => {
    const schema = {
        "name": Joi.string().min(3).required(),
    }
    const JoiSchema = Joi.object(schema);
    const validateCategory = JoiSchema.validate(data);
    return validateCategory;
}

module.exports = CategoryValidation;
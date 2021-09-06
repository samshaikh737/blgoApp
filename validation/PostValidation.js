const Joi = require("joi");

const AddPostValidation = (data) =>{
    
    const schema = {
        "title": Joi.string().min(3).required(),
        "desc": Joi.string().min(6).required(),
        "photo": Joi.string(),
        "user": Joi.string().required(),
        "category": Joi.array()
    }
    
    //Lets Validate the data before we a user
    const joiSchema = Joi.object(schema);
    const validatePost = joiSchema.validate(data)

    return validatePost;
}
const updatePostValidation = (data) =>{
    
    const schema = {
        "id": Joi.string().required(),
        "title": Joi.string().min(3),
        "desc": Joi.string().min(6),
        "photo": Joi.string(),
        "user": Joi.string().required(),
        "category": Joi.array()
    }
    
    //Lets Validate the data before we a user
    const joiSchema = Joi.object(schema);
    const validatePost = joiSchema.validate(data)

    return validatePost;
}

module.exports = { AddPostValidation ,updatePostValidation };

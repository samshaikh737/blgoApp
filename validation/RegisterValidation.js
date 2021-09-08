const Joi = require("joi");

const registerUserValidation = (data) =>{
    
    const schema = {
        "username": Joi.string().min(3).required(),
        "email": Joi.string().min(3).required().email(),
        "password": Joi.string().min(6).required(),
        "profilePic": Joi.string(),
    }
    
    //Lets Validate the data before we a user
    const joiSchema = Joi.object(schema);
    const validateUser = joiSchema.validate(data)

    return validateUser;
}


const loginUserValidation = (data) =>{
    
    const schema = {
        "email": Joi.string().min(3).required(),
        "password": Joi.string().min(6).required()
    }
    
    //Lets Validate the data before we a user
    const joiSchema = Joi.object(schema);
    const validateUser = joiSchema.validate(data)

    return validateUser;
}

module.exports = {registerUserValidation,loginUserValidation};
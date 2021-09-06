const Joi = require("joi");

const userValidation = (data) => {

    const schema = {
        "id": Joi.string().required(),
        "username": Joi.string().min(3),
        "email": Joi.string().min(3).email(),
        "password": Joi.string().min(6)
    }

    //Lets Validate the data before we a user
    const joiSchema = Joi.object(schema);
    const validateUser = joiSchema.validate(data)

    return validateUser;
}

const userDeleteValidation = (data) => {

    const schema = {
        "id": Joi.string().required(),
        "username": Joi.string().required(),
        "password": Joi.string().required()
    }

    //Lets Validate the data before we a user
    const joiSchema = Joi.object(schema);
    const validateUser = joiSchema.validate(data)

    return validateUser;
}



module.exports = {userValidation ,userDeleteValidation};
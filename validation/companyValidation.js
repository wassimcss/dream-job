const Joi = require("@hapi/joi");


// register validation for a company
const registerValidation = (data) => {
    const schema = Joi.object({
        name :Joi.string().min(3).required(),
        email :Joi.string().min(6).email().required(),
        phone:Joi.string().length(8).pattern(/^[0-9]+$/).required().messages({
            "string.length": "phone number not valid",
            "string.pattern": "phone number not valid"
        }),
        field :Joi.string().min(3),
        address :Joi.string().min(3),
        
        
    })
    return schema.validate(data)
}

// login validation for company
const loginValidation = (data) => {
    const schema =Joi.object({
        email :Joi.string().min(6).email().required(),
        password :Joi.string().min(6).required()
    })
    return schema.validate(data)

}

module.exports = {registerValidation ,loginValidation}


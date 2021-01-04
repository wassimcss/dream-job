const Joi = require("@hapi/joi");


//register vaidation for employee
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName:Joi.string().min(3).required(),
        lastName:Joi.string().min(3).required(),
        email:Joi.string().min(6).email().required(),
        age :Joi.number() ,
        profession:Joi.string().required(),
        field:Joi.string(),
        address:Joi.string(),
        phone:Joi.string().length(8).pattern(/^[0-9]+$/).required().messages({
            "string.length": "phone number not valid",
            "string.pattern": "phone number not valid"
        }),
        college:Joi.string(),
        highSchool:Joi.string(),
        traineeship:Joi.string(),
        experience:Joi.string()
       
    })
    return schema.validate(data)
}

//login validation for employee
const loginValidation = (data) => {
    const schema =Joi.object({
        email :Joi.string().min(6).email().required(),
        password :Joi.string().min(6).required()
    })
    return schema.validate(data)

}
module.exports = {registerValidation,loginValidation}
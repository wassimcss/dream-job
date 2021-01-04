const Joi = require("@hapi/joi");


// job validation for a company
const jobValidation = (data) => {
    const schema = Joi.object({
        job :Joi.string().required(),
        company : Joi.string().required(),
        description :Joi.string().required(),
        phone:Joi.string().length(8).pattern(/^[0-9]+$/).required().messages({
            "string.length": "phone number not valid",
        }),
        field :Joi.string().min(3),
        address :Joi.string().min(3),
        contrat:Joi.string().min(1).required(),
        salary:Joi.number().required(),
        email:Joi.string().email().required()

    })
    return schema.validate(data)
}



module.exports = {jobValidation }


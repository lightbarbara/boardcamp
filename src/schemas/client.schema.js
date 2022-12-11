import joi from 'joi'

export const clientSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().length(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.string().length(10).required()
})
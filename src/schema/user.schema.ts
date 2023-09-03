import joi from 'joi'

export const userSchema = joi.object().keys({
    id: joi.string().optional(),
    fullName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).regex(/^\S*$/, 'Passowrd must be a strong password').required(),
    phoneNumber: joi.string().min(6).required(),
    description: joi.string().optional(),
    createdAt: joi.date().optional(),
    updatedAt: joi.date().optional(),
    deletedAt: joi.date().optional()
}).required()
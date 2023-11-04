import joi from 'joi';
import { Priorities } from '@prisma/client';

export const createTaskValidation = joi.object({
    task: joi.string().required(),
    priority: joi.string().valid(...Object.values(Priorities))
})
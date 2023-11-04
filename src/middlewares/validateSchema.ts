import { Response, Request, NextFunction } from "express"
import joi from "joi"
import { badRequestError } from "../errors/badRequestError.js"

export function validateSchema(schema: joi.ObjectSchema<any>){
    return (req: Request, res: Response, next: NextFunction) => {

        const {error, value} = schema.validate(req.body)

        if(error){
            throw badRequestError(error.details.map(e => e.message)[0])
        }
        
        req.body = {...value}
        next()
    }
}
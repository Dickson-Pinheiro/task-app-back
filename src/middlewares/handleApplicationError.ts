import { ErrorRequestHandler, Response } from 'express'
import { ErrorResponse } from '../protocols/error.js'

const acceptedErros = {
    notFoundError: (err: ErrorResponse, res: Response) => {
       return res.status(404).send({message: err.message})
    },
    conflictError: (err: ErrorResponse, res: Response) => {
        return res.status(409).send({message: err.message})
    },
    internalServerError: (err: ErrorResponse, res: Response) => {
        return res.status(500).send({message: "erro inesperado"})
    },
    badRequestError(err: ErrorResponse, res: Response){
        return res.status(400).send({message: err.message})
    },
    unauthorizedError(err: ErrorResponse, res: Response){
        return res.status(401).send({message: err.message})
    }
}

export type ErrorNameOptions = keyof typeof acceptedErros

export const handleApplicationErrors: ErrorRequestHandler = (err: ErrorResponse, _req, res, _next)=> {
    console.log(err)
    try {
        const handleError = acceptedErros[err.name]
        return handleError(err, res)   
    } catch (error) {
        acceptedErros.internalServerError(err, res)
    }
}
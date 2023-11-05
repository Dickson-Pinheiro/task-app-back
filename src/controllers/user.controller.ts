import { NextFunction, Request, Response } from "express"
import { userService } from "../services/user.service.js"
import { ICreateUser, ILoginUser } from "../protocols/user.js"

async function create(req: Request, res: Response, next: NextFunction){
    const { name, email, password } = req.body as ICreateUser
    try {
     await userService.create(name, email, password)
     res.status(201).send();
    } catch (error) {
         next(error)
    }
}

async function login(req: Request, res: Response, next: NextFunction){
        const { email, password } = req.body as ILoginUser
    try {
        const {token, name} = await userService.login(email, password)
        return res.send({token, name})
    } catch (error) {
        next(error)
    }
}

export const userController = {
    create,
    login
}
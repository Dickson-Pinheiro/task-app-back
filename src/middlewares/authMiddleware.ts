import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authRouteMiddleware(req: Request, res: Response, next: NextFunction){
    const auth = req.headers.authorization
    if(!auth){
        return res.status(401).send({name: "unauthorized", message: "unauthorized"})
    }
    const [, token] = auth.split(' ');
    if(!token){
        return res.status(401).send({name: "unauthorized", message: "unauthorized"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any , decoded: any ) => {
        if(err){
            return res.status(401).send({name: "unauthorized", message: "unauthorized"})
        }
        else {
            req.app.locals.userId = decoded.id
            next()
        }
    })
}
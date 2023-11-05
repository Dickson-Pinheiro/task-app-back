import { badRequestError } from "../errors/badRequestError.js";
import { conflictError } from "../errors/conflictError.js";
import { notFoundError } from "../errors/notFoundError.js";
import { userRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

async function create(name: string, email: string, password: string){
    const userWithEmail = await userRepository.getUserByEmail(email)
    if(userWithEmail){
        throw conflictError("Tente com outro e-mail.");
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    try {
        await userRepository.createUser(name, email, hashedPassword)
    } catch (error) {
        throw badRequestError("Não foi possível criar o usuário")
    }      
}

async function login(email: string, password: string){
    const userWithEmail = await userRepository.getUserByEmail(email)
    if(!userWithEmail){
        throw notFoundError("usuário não encontrado")
    }

    const comparePassword = bcrypt.compareSync(password, userWithEmail.password)
    if(!comparePassword){
        throw conflictError("e-mail ou senha incorretos.")
    }

    const token = jwt.sign({id: userWithEmail.id}, process.env.JWT_SECRET_KEY, {expiresIn: "12h"})
    
    return {
        token,
        name: userWithEmail.name,
    }
}

export const userService = {
    create,
    login
}
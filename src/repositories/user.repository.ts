import { prisma } from "../config/connection.js";

async function getUserByEmail(email: string){
    return prisma.users.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true
        }
    })
}

async function createUser(name: string, email: string, password: string){
    return prisma.users.create({
        data: {
            email,
            name,
            password
        }
    })
}

export const userRepository = {
    getUserByEmail,
    createUser
}
import { prisma } from "../../src/config/connection.js";


export async function cleanDb(){
    await prisma.tasks.deleteMany({});
    await prisma.users.deleteMany({});
}
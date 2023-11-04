import { Priorities } from "@prisma/client";
import { prisma } from "../config/connection.js";

async function create(task: string, priorityValue: number, priority: Priorities, authorId: string){
    return prisma.tasks.create({
        data: {
            task,
            priority,
            priorityValue,
            authorId
        }
    })
}

async function getTasksByAuthorId(authorId: string){
    return prisma.tasks.findMany({
        where: {
            authorId
        }
    })
}

export const taskRepository = {
    create,
    getTasksByAuthorId
}
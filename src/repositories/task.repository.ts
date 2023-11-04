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

async function getTasksById(id: string){
    return prisma.tasks.findUnique({
        where: {
            id
        }
    })
}

async function updateTask(task: string, priority: Priorities, priorityValue: number, taskId: string){
    return prisma.tasks.update({
        where: {
            id: taskId
        },
        data: {
            task,
            priority,
            priorityValue
        }
    })
}

async function done(id: string){
    return prisma.tasks.update({
        where: {
            id
        },
        data: {
            done: true
        }
    })
}

async function undone(id: string){
    return prisma.tasks.update({
        where: {
            id
        },
        data: {
            done: false
        }
    })
}

async function deleteTask(id: string){
    return prisma.tasks.delete({
        where: {
            id
        }
    })
}

export const taskRepository = {
    create,
    getTasksByAuthorId,
    getTasksById,
    updateTask,
    done,
    undone,
    deleteTask
}
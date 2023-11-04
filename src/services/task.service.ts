import { Priorities } from "@prisma/client";
import { taskRepository } from "../repositories/task.repository.js";
import { notFoundError } from "../errors/notFoundError.js";
import { conflictError } from "../errors/conflictError.js";

function getPriorityValue(priority: Priorities){
    switch (priority) {
        case "urgente":
            return 1
        case "alta":
            return 2
        case "media":
            return 3
        case "baixa":
            return 4
        default:
            return 1
    }
}

async function createTask(authorId: string, task: string, priority: Priorities){
    const priorityValue = getPriorityValue(priority);
    return await taskRepository.create(task, priorityValue, priority, authorId)
}

async function getTasksByAuthorId(authorId: string){
    return await taskRepository.getTasksByAuthorId(authorId);
}

async function update(userId: string, taskId: string, text: string, priority: Priorities){
    const task = await taskRepository.getTasksById(taskId)
    if(!task){
        throw notFoundError('Task não encontrata')
    }
    if(task.authorId !== userId){
        throw conflictError("Não é possível alterar essa task")
    }

    const priorityValue = getPriorityValue(priority)
    await taskRepository.updateTask(text, priority, priorityValue, taskId)
}

async function done(id: string, userId: string){
    const task = await taskRepository.getTasksById(id)
    if(!task){
        throw notFoundError("task não encontrada.")
    }
    if(task.authorId !== userId){
        throw conflictError("Não é possível alterar essa task")
    }

    await taskRepository.done(id)
}

async function undone(id: string, userId: string){
    const task = await taskRepository.getTasksById(id)
    if(!task){
        throw notFoundError("task não encontrada.")
    }
    if(task.authorId !== userId){
        throw conflictError("Não é possível alterar essa task")
    }

    await taskRepository.undone(id)
}

async function deleteTask(id: string, userId: string){
    const task = await taskRepository.getTasksById(id)
    if(!task){
        throw notFoundError("task não encontrada.")
    }
    if(task.authorId !== userId || task.done){
        throw conflictError("Não é possível alterar essa task")
    }

    await taskRepository.deleteTask(id)
}

export const taskService = {
    createTask,
    getTasksByAuthorId,
    update,
    done,
    undone,
    deleteTask
}
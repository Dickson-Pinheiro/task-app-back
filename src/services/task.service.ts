import { Priorities } from "@prisma/client";
import { taskRepository } from "../repositories/task.repository.js";

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

export const taskService = {
    createTask
}
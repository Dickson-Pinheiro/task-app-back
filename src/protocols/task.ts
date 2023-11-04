import { Priorities } from "@prisma/client"

export interface ICreateTask {
    task: string
    priority: Priorities
}
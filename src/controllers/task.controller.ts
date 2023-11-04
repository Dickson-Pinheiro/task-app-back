import { NextFunction, Request, Response } from "express"
import { ICreateTask } from "../protocols/task.js"
import { taskService } from "../services/task.service.js"


async function getAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.app.locals
    try {
        const tasks = await taskService.getTasksByAuthorId(userId)
        res.send(tasks)
    } catch (error) {
        next(error)
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    const { task, priority } = req.body as ICreateTask
    const { userId } = req.app.locals

    try {
        await taskService.createTask(userId, task, priority)
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }

}

export const taskController = {
    getAll,
    create
}
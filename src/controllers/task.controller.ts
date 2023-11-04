import { NextFunction, Request, Response } from "express"
import { ICreateTask, IUpdateTask } from "../protocols/task.js"
import { taskService } from "../services/task.service.js"


async function getAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.app.locals
    try {
        const tasks = await taskService.getTasksByAuthorId(userId)
        return res.send(tasks)
    } catch (error) {
        next(error)
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    const { task, priority } = req.body as ICreateTask
    const { userId } = req.app.locals
    try {
        await taskService.createTask(userId, task, priority)
        return res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

async function update(req: Request, res: Response, next: NextFunction){
    const { id: taskId } = req.params;
    const userId = req.app.locals.userId as string;
    const { task, priority } = req.body as IUpdateTask;

    try {
        await taskService.update(userId, taskId, task, priority)
        return res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

async function done(req: Request, res: Response, next: NextFunction){
    const {id} = req.params
    const userId = req.app.locals.userId as string
    try {
        await taskService.done(id, userId)
        return res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

async function undone(req: Request, res: Response, next: NextFunction){
    const {id} = req.params
    const userId = req.app.locals.userId as string
    try {
        await taskService.undone(id, userId)
        return res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

async function deleteTask(req: Request, res: Response, next: NextFunction){
    const {id} = req.params
    const userId = req.app.locals.userId as string
    try {
        await taskService.deleteTask(id, userId)
        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const taskController = {
    getAll,
    create,
    update,
    done,
    undone,
    deleteTask
}
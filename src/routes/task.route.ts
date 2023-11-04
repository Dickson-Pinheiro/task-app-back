import { taskController } from "../controllers/task.controller.js";
import { Router } from "express";
import { authRouteMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createTaskValidation } from "../schemas/createTaskSchema.js";
import { updateTaskSchema } from "../schemas/updateTaskSchema.js";
const  taskRoutes = Router();

taskRoutes.get('/', authRouteMiddleware, taskController.getAll)
taskRoutes.post('/', authRouteMiddleware, validateSchema(createTaskValidation), taskController.create)
taskRoutes.put('/:id', authRouteMiddleware, validateSchema(updateTaskSchema), taskController.update)
taskRoutes.put('/done/:id', authRouteMiddleware, taskController.done)
taskRoutes.put('/undone/:id', authRouteMiddleware, taskController.undone)
taskRoutes.delete('/:id', authRouteMiddleware, taskController.deleteTask)

export { taskRoutes }
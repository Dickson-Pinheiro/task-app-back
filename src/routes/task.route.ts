import { taskController } from "../controllers/task.controller.js";
import { Router } from "express";
import { authRouteMiddleware } from "../middlewares/authMiddleware.js";
const  taskRoutes = Router();

taskRoutes.get('/', authRouteMiddleware, taskController.getAll)
taskRoutes.post('/', authRouteMiddleware, taskController.create)

export { taskRoutes }
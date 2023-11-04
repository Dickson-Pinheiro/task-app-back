import { Router } from "express";
import { taskRoutes } from "./task.route.js";
import { userRouter } from "./user.route.js";
const routes = Router();

routes.use('/tasks', taskRoutes)
routes.use('/auth', userRouter)

export { routes }
import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createUserSchema } from "../schemas/createUserEchema.js";

const userRouter = Router()

userRouter.post('/signup', validateSchema(createUserSchema), userController.create)
userRouter.post('/signin', userController.login)

export { userRouter }
import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createUserSchema } from "../schemas/createUserEchema.js";
import { loginUserSchema } from "../schemas/loginUserSchema.js";

const userRouter = Router()

userRouter.post('/signup', validateSchema(createUserSchema), userController.create)
userRouter.post('/signin', validateSchema(loginUserSchema), userController.login)

export { userRouter }
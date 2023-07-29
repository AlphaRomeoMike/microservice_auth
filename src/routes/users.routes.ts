import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import confirmAuthenticated from "../middlewares/authenticate.middleware";

const userRouter = express.Router();

const controller = UserController()

userRouter.post('/singup', controller.create)
userRouter.post('/login', controller.login)

export default userRouter;
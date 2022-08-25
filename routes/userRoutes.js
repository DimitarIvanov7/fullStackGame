import express from "express";
import {
	user_index,
	user_create,
	user_login,
	user_logout,
	refresh_token,
	user_getName,
	user_getWeared,
	user_setWeared,
} from "../contollers/userController.js";

import { verifyUser } from "../contollers/Authentication.js";

const userRouter = express.Router();

userRouter.get("/:id", user_index);

userRouter.get("/name/:id", user_getName);

userRouter.get("/weared/:id", user_getWeared);

userRouter.post("/", user_create);

userRouter.post("/login", user_login);

userRouter.post("/logout", verifyUser, user_logout);

userRouter.post("/refresh", refresh_token);
userRouter.post("/weared/:id", user_setWeared);

export default userRouter;

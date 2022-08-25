import express from "express";

import { duel_create, add_player } from "../contollers/duelControllers.js";

import { verifyUser } from "../contollers/Authentication.js";

const duelRouter = express.Router();

duelRouter.post("/", duel_create);

duelRouter.put("/", add_player);

export default duelRouter;

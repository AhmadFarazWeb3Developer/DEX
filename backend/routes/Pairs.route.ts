import { Router } from "express";
import createPair from "../controllers/createPair.controller.js";

const PairsRouter = Router();

PairsRouter.post("/createPair", createPair);

export default PairsRouter;

import { Router } from "express";
import createPair from "../controllers/createPair.controller.js";
import getAllPairs from "../controllers/getAllPairs.controller.js";

const PairsRouter = Router();

PairsRouter.post("/create-pair", createPair);
PairsRouter.get("/get-all-pairs", getAllPairs);

export default PairsRouter;

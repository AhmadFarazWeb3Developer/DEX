import Pairs from "../models/Pairs.model.js";
import type { Request, Response } from "express";

const getAllPairs = async (req: Request, res: Response) => {
  try {
    const allPairs = await Pairs.find();

    return res.status(201).json(allPairs);
  } catch (error: any) {
    console.error("Error in getAllPairs controller:", error);
    res.status(500).json({
      error: "Error in getting all pairs controller",
      details: error,
    });
  }
};

export default getAllPairs;

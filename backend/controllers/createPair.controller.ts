import Pairs from "../models/Pairs.model.js";
import type { Request, Response } from "express";

const createPair = async (req: Request, res: Response) => {
  try {
    const { pairAddress, pair } = req.body;

    if (!pairAddress || !pair) {
      return res.status(400).json({
        error: "pair address is required",
      });
    }
    const newPair = new Pairs({
      pairAddress,
      pair,
    });

    const savedPair = await newPair.save();

    return res.status(201).json(savedPair);
  } catch (error: any) {
    console.error("Error in createCollection:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
      details: error,
    });
  }
};

export default createPair;

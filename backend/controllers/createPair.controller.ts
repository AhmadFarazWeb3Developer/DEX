import Pairs from "../models/Pairs.model.js";
import type { Request, Response } from "express";

const createPair = async (req: Request, res: Response) => {
  try {
    const { pairAddress, pair, tokensSymbol } = req.body;

    if (!pairAddress || !pair) {
      return res.status(400).json({
        error: "pair address is required",
      });
    }
    const newPair = new Pairs({
      pairAddress,
      pair,
      tokensSymbol,
    });

    const savedPair = await newPair.save();

    return res.status(201).json(savedPair);
  } catch (error: any) {
    console.error("Error in createPair controller:", error);
    res.status(500).json({
      error: "Error in createPair controller",
      details: error,
    });
  }
};

export default createPair;

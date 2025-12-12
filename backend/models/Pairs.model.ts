import mongoose from "mongoose";

const pairsSchema = new mongoose.Schema({
  pairAddress: {
    type: String,
    required: true,
  },

  pair: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 2,
      message: "pair must contain exactly 2 addresses",
    },
  },
});

const Pairs = mongoose.model("pairs", pairsSchema);

export default Pairs;

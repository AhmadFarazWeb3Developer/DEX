import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_CONNECTION_STRING;

const connectDB = async () => {
  if (!URI) throw new Error("URI not exists");
  await mongoose.connect(`${URI}/DEX`).then(() => {
    console.log("DB Connected!");
  });
};

export default connectDB;

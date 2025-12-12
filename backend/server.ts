import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.config.js";
const app = express();

const Port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log("Server is running at ", Port);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });

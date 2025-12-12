import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.config.js";
import cors from "cors";

const app = express();

import PairsRouter from "./routes/Pairs.route.js";

const Port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pair/", PairsRouter);

connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log("Server is running at ", Port);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });

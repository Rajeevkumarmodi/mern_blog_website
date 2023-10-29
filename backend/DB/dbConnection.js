import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Data base is successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

export { mongoose };

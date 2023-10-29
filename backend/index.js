import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./DB/dbConnection.js";
const app = express();

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.end("Hello world");
});

app.listen(PORT, () => {
  console.log(`server is start on PORT ${PORT}`);
});

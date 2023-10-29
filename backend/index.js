import express from "express";
import dotenv from "dotenv";
import "./DB/dbConnection.js";
import router from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/user", router);

// app.get("/", (req, res) => {
//   res.end("Hello world");
// });

app.listen(PORT, () => {
  console.log(`server is start on PORT ${PORT}`);
});

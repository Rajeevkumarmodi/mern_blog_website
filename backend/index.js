import express from "express";
import dotenv from "dotenv";
import "./DB/dbConnection.js";
import router from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/user/api", router);

app.listen(PORT, () => {
  console.log(`server is start on PORT ${PORT}`);
});

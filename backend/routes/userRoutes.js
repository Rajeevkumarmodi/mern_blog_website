import express from "express";

const router = express.Router();

router.get("/data", (req, res) => {
  res.send("this is user data route");
});

export default router;

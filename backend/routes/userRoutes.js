import express from "express";
// import { User } from "../models/User.models.js";
import { userSignupControllers } from "../controllers/userControllers.js";
const router = express.Router();

// signup route
router.post("/signup", userSignupControllers);

export default router;

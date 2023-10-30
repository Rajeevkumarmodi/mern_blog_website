import express from "express";
// import { User } from "../models/User.models.js";
import {
  userSignupControllers,
  userLoginControllers,
} from "../controllers/userControllers.js";
const router = express.Router();

// signup route
router.post("/signup", userSignupControllers);
router.post("/login", userLoginControllers);

export default router;

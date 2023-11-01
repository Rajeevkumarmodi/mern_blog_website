import express from "express";
import {
  userSignupControllers,
  userLoginControllers,
  singleUserData,
} from "../controllers/userControllers.js";

import jwt_authentication from "../middleware/auth.js";

const router = express.Router();

// signup route
router.post("/signup", userSignupControllers);

// login route
router.post("/login", userLoginControllers);

// single user route

router.get("/userinfo", jwt_authentication, singleUserData);

export default router;

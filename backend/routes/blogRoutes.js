import express from "express";
import jwt_authentication from "../middleware/auth.js";
const router = express.Router();

import { creatBlogControllers } from "../controllers/blogControllers.js";
import upload from "../multerConfig/multerStorage.js";

// creat blog route
router.post(
  "/createblog",
  jwt_authentication,
  upload.single("blogImage"),
  creatBlogControllers
);

export default router;

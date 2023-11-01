import express from "express";
import jwt_authentication from "../middleware/auth.js";
const router = express.Router();

import {
  creatBlogControllers,
  getAllBlogs,
  getUserBlogs,
} from "../controllers/blogControllers.js";
import upload from "../multerConfig/multerStorage.js";

// creat blog route
router.post(
  "/createblog",
  jwt_authentication,
  upload.single("blogImage"),
  creatBlogControllers
);
// user get blog
router.post("/getuserblogs", jwt_authentication, getUserBlogs);

// get all blogs

router.get("/allblogs", jwt_authentication, getAllBlogs);

export default router;

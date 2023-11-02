import express from "express";
import jwt_authentication from "../middleware/auth.js";
const router = express.Router();

import {
  creatBlogControllers,
  deleteSingleBlog,
  getAllBlogs,
  getUserBlogs,
  editSingleBlog,
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

// delete blog

router.delete("/blog/:id", jwt_authentication, deleteSingleBlog);

// edit blog
router.patch(
  "/editblog/:id",
  jwt_authentication,
  upload.single("blogImage"),
  editSingleBlog
);
export default router;

import express from "express";
import jwt_authentication from "../middleware/auth.js";
import multer from "multer";
const router = express.Router();

import {
  creatBlogControllers,
  deleteSingleBlog,
  getAllBlogs,
  getUserBlogs,
  editSingleBlog,
  getSingleBlog,
  blogLike,
  blogUnlike,
  blogComment,
} from "../controllers/blogControllers.js";
import { storage } from "../config/cloudinary.js";
let uploader = multer({ storage });

// creat blog route
router.post(
  "/createblog",
  jwt_authentication,
  uploader.single("blogImage"),
  // upload.single("blogImage"),
  creatBlogControllers
);
// user get blog
router.get("/getuserblogs", jwt_authentication, getUserBlogs);

// get all blogs

router.get("/allblogs", jwt_authentication, getAllBlogs);

// delete blog

router.delete("/:id", jwt_authentication, deleteSingleBlog);

// edit blog
router.patch(
  "/editblog/:id",
  jwt_authentication,
  uploader.single("blogImage"),
  editSingleBlog
);

router.get("/bloginfo/:id", jwt_authentication, getSingleBlog);

// blog like

router.get("/:id/like", jwt_authentication, blogLike);

// blog unlike
router.get("/:id/unlike", jwt_authentication, blogUnlike);

// blog comment

router.post("/:id/comment", jwt_authentication, blogComment);
export default router;

import express from "express";
const router = express.Router();

import { creatBlogControllers } from "../controllers/blogControllers.js";
import upload from "../multerConfig/multerStorage.js";

// creat blog route
router.post("/createblog", upload.single("blogImage"), creatBlogControllers);

export default router;

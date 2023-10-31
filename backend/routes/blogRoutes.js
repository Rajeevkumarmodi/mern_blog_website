import express from "express";
const router = express.Router();

import { creatBlogControllers } from "../controllers/blogControllers.js";

// creat blog route
router.post("/createblog", creatBlogControllers);

export default router;

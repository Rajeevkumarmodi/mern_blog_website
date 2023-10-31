import { Blog } from "../models/Blog.models.js";

export const creatBlogControllers = (req, res) => {
  const { title, description } = req.body;
  res.send("create blog route");
};

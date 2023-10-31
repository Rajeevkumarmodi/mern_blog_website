import { Blog } from "../models/Blog.models.js";

export const creatBlogControllers = (req, res) => {
  const { title, description } = req.body;
  console.log(req.file);
  console.log(title, description);
  res.send("create blog route");
};

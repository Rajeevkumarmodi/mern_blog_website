import mongoose from "mongoose";
import { Blog } from "../models/Blog.models.js";
import { User } from "../models/User.models.js";
import path from "path";

export const creatBlogControllers = async (req, res) => {
  const { title, description, category } = req.body;
  const file = req.file.filename;
  const extension = path.extname(file);
  const userId = req.userId;
  console.log(title, description, category);

  if (!title || !description || !file || !category) {
    return res.status(404).json({ error: "All fields are required" });
  }

  if (extension != ".png" && extension != ".jpg" && extension != "jpeg") {
    return res
      .status(404)
      .json({ error: "only .png , .jpeg , jpg formate allowed" });
  }

  const user = await User.findById({ _id: userId }).select("-password");
  console.log(user);
  res.send(user);
};

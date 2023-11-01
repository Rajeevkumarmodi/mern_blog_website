import mongoose from "mongoose";
import { Blog } from "../models/Blog.models.js";
import { User } from "../models/User.models.js";
import path from "path";

// create blog controllers
export const creatBlogControllers = async (req, res) => {
  const { title, description, category } = req.body;
  const file = req.file.filename;
  const extension = path.extname(file);
  const userId = req.userId;

  if (!title || !description || !file || !category) {
    return res.status(404).json({ error: "All fields are required" });
  }

  if (extension != ".png" && extension != ".jpg" && extension != "jpeg") {
    return res
      .status(404)
      .json({ error: "only .png , .jpeg , jpg formate allowed" });
  }

  try {
    const exisitingUser = await User.findById({ _id: userId }).select(
      "-password"
    );
    if (!exisitingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(exisitingUser);
    const newBlog = await Blog({
      title,
      description,
      category,
      blogImage: file,
      author: userId,
      comments: [],
      likes: [],
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).json({ success: "Blog created !", newBlog });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
    console.log(err);
  }
};

// get user blogs

export const getUserBlogs = async (req, res) => {
  const userId = req.userId;

  try {
    const exisitingUser = await User.findById({ _id: userId });
    if (!exisitingUser) {
      return res.status(404).json({ error: "All fields are required" });
    }

    const userBlogs = await User.findById({ _id: userId }).populate("blogs");
    res.status(200).json({ success: userBlogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error", error });
  }
};

// get all blogs

export const getAllBlogs = async (req, res) => {
  const userId = req.userId;

  try {
    const exisitingUser = await User.findOne({ _id: userId });

    if (!exisitingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const allBlogs = await Blog.find();

    res.status(200).json({ success: allBlogs, totalBlogs: allBlogs.length });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error", err });
  }
};

import mongoose from "mongoose";
import { Blog } from "../models/Blog.models.js";
import { User } from "../models/User.models.js";
import Comment from "../models/Comment.models.js";
import path from "path";
import { uploadOnCloudinary } from "../config/cloudinary.js";

// create blog controllers
export const creatBlogControllers = async (req, res) => {
  const { title, description, category } = req.body;
  const file = req.file.originalname;
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

  if (file > 512000) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, "please provide image size less then 500kb", false)
      );
  }

  try {
    const exisitingUser = await User.findById({ _id: userId }).select(
      "-password"
    );
    if (!exisitingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let result = await uploadOnCloudinary(req.file.path);

    console.log("result", result);

    if (!result) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Image not uploaded", false));
    }

    const newBlog = await Blog({
      title,
      description,
      category,
      blogImage: result?.secure_url,
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
      return res.status(404).json({ error: "User not valid" });
    }

    const userBlogs = await User.findById({ _id: userId }).populate({
      path: "blogs",
    });
    res.status(200).json({ success: userBlogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error", error });
  }
};

// get all blogs

export const getAllBlogs = async (req, res) => {
  const userId = req.userId;
  const searchText = req.query.search || "";
  const categorie = req.query.categorie;

  const query = {
    title: { $regex: searchText, $options: "i" },
  };

  categorie != "All" ? (query.category = categorie) : "";

  try {
    const exisitingUser = await User.findOne({ _id: userId });

    if (!exisitingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const allBlogs = await Blog.find(query).populate("author");
    res.status(200).json({ success: allBlogs, totalBlogs: allBlogs.length });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error", err });
  }
};

// delete blog

export const deleteSingleBlog = async (req, res) => {
  const userId = req.userId;
  const blogId = req.params.id;

  try {
    const exisitingUser = await User.findOne({ _id: userId });

    if (!exisitingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const removeElm = await User.updateOne(
      { _id: userId },
      { $pull: { blogs: blogId } }
    );

    if (removeElm.modifiedCount === 1) {
      const deleteBlog = await Blog.deleteOne({ _id: blogId });
      return res.status(200).json({ success: "blog deleted" });
    } else {
      return res.status(404).json({ error: "blog is not deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error", err });
  }
};

// edit blog

export const editSingleBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.userId;

  const { title, description, category, blogImage } = req.body;
  const file = req.file ? req.file.filename : blogImage;

  try {
    const exisitingUser = await User.findOne({ _id: userId });
    if (!exisitingUser) {
      return res.status(404).json({ error: "user not found" });
    }

    const singleBlog = await Blog.find({ _id: blogId });
    console.log(singleBlog);
    const updateBlog = await Blog.updateOne(
      { _id: blogId },
      {
        $set: {
          title,
          description,
          category,
          blogImage: file,
        },
        $currentDate: { lastUpdated: true },
      }
    );

    res.status(200).json({ success: "update details successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// single blog

export const getSingleBlog = async (req, res) => {
  const userId = req.userId;
  const blogId = req.params.id;

  try {
    const exisitingUser = await User.findOne({ _id: userId });

    if (!exisitingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const singleBlog = await Blog.findOne({ _id: blogId })
      .populate("author")
      .populate({ path: "comments", populate: { path: "commentBy" } });
    if (!singleBlog) {
      return res.status(404).json({ error: "Invalid Id" });
    } else {
      return res.status(200).json({ success: singleBlog });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error", err });
  }
};

// blog like

export const blogLike = async (req, res) => {
  const userId = req.userId;
  const blogId = req.params.id;

  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const blogLike = await Blog.updateOne(
      { _id: blogId },
      {
        $addToSet: { likes: userId },
      }
    );
    const userLike = await User.updateOne(
      { _id: userId },
      {
        $addToSet: { favourites: blogId },
      }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: userLike });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Internal server error", err });
  }
};

// blog unlike post

export const blogUnlike = async (req, res) => {
  const userId = req.userId;
  const blogId = req.params.id;

  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    const unlike = await Blog.updateOne(
      { _id: blogId },
      {
        $pull: { likes: userId },
      }
    );

    const userUnlike = await User.updateOne(
      { _id: userId },
      {
        $pull: { favourites: blogId },
      }
    );

    res.status(200).json({ success: userUnlike });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const blogComment = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.userId;
  const commentText = req.body.comment;
  if (!commentText) {
    return res.status(404).json({ error: "Please fill comment" });
  } else {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const newComment = new Comment({
        commentText,
        commentBy: userId,
      });

      const updateBlog = await Blog.updateOne(
        { _id: blogId },
        { $push: { comments: newComment._id } }
      );

      await newComment.save();
      res.status(200).json({ success: newComment });
      session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      res.status(500).json({ error: "Internal server error", err });
    }
  }
};

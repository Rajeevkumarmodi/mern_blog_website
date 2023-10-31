import { User } from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user signup controllers
export const userSignupControllers = async (req, res) => {
  const { name, email, password } = req.body;
  const blogs = [];
  const favourites = [];

  if (!name || !email || !password) {
    return res.status(404).json({ error: "All fields are required" });
  }
  if (!email.includes("@" && ".")) {
    return res.status(404).json({ error: "Please enter valid email" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ error: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 13);

    const newUser = new User({
      name,
      email,
      password: hasPassword,
      blogs,
      favourites,
    });
    await newUser.save();
    res.status(200).json({ success: newUser });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Internal server error" });
  }
};

// user login controllers

export const userLoginControllers = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ error: "All fields are required" });
  }

  // email validation
  if (!email.includes("@" && ".")) {
    return res.status(404).json({ error: "please enter valid email" });
  }

  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(404).json({ error: "user not registered" });
    }

    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res.status(404).json({ error: "password not match" });
    }
    const token = jwt.sign(
      { userId: existUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );
    res
      .status(200)
      .json({ success: "user successfully login", jwt_token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

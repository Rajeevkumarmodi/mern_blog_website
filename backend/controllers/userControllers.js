import { User } from "../models/User.models.js";
import bcrypt from "bcrypt";

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

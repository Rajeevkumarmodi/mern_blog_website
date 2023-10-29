import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trime: true,
    },
    password: {
      type: String,
      required: true,
      trime: true,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favourite",
      },
    ],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);

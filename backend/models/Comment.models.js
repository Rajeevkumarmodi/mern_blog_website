import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;

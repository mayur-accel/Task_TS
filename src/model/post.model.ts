import mongoose, { Schema } from "mongoose";

export const postkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
    postCreatedAt: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      requried: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postkSchema);

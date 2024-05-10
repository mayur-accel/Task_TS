import mongoose, { Schema } from "mongoose";

export const categorykSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorykSchema);

import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;

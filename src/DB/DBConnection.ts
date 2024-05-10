import mongoose from "mongoose";

export const DatabaseConnetion = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Database connet");
  } catch (error) {
    console.log(error);
  }
};

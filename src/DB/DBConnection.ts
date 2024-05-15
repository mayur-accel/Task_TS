import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Database connected successfully");
  } catch (error: any) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

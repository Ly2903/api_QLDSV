import mongoose from "mongoose";
import { DB_URL } from "../config/index.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("error", error);
  }
};

export default connectDB;

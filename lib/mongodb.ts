import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MongoDB URI missing");
  }

  await mongoose.connect(MONGODB_URI);
}
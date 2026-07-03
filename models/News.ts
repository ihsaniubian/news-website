import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String, // ✅ ADD THIS
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.News ||
  mongoose.model("News", NewsSchema);
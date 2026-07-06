import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    author: {
      type: String,
      default: "Admin",
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.News ||
  mongoose.model("News", NewsSchema);
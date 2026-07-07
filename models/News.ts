import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
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

    imageUrl: {
      type: String,
      default: "",
    },

    source: {
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
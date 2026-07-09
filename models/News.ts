import mongoose, { Schema, model, models } from 'mongoose';

// 📰 Khabarnama Article Schema Definition
const NewsSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Title lazmi hai'], 
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true 
    },
    summary: { 
      type: String, 
      required: [true, 'Summary lazmi hai'],
      trim: true 
    },
    content: { 
      type: String, 
      required: [true, 'Content tafseel lazmi hai'] 
    },
    category: { 
      type: String, 
      required: true, 
      enum: ['pakistan', 'business', 'politics', 'sports', 'world'],
      default: 'pakistan' 
    },
    imageUrl: { 
      type: String, 
      required: [true, 'Feature image URL lazmi hai'] 
    },
    source: { 
      type: String, 
      default: 'Khabarnama Report' 
    },
    author: { 
      type: String, 
      default: 'Admin' 
    },
    published: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    // Is se createdAt aur updatedAt automatic banenge jo sitemap ke liye zaroori hain
    timestamps: true 
  }
);

// ⚡ Next.js safe serverless model export rule
const News = models.News || model('News', NewsSchema);

export default News;
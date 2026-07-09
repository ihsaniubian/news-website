import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Meharbani karke apni .env file mein MONGODB_URI configuration add karein!');
}

export const connectDB = async () => {
  // Agar pehle se connected hai to dobara connect nahi karega (Serverless optimization)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected Successfully! 🔌🎉');
  } catch (error) {
    console.error('Database connection crash error:', error);
    throw new Error('Database connect karne mein masla aaya hai.');
  }
};
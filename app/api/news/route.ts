import { NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';
// 🔌 Database connection aur Model imports
import { connectDB } from '@/lib/mongodb'; 
import News from '@/models/News';

// ==========================================
// 1. GET METHOD - Saari News Fetch Karne Ke Liye
// ==========================================
export async function GET() {
  try {
    // Database Connect karein
    await connectDB();

    // Saari news fetch karein (Newest first - jo nayi post ho wo upar aaye)
    const allNews = await News.find().sort({ createdAt: -1 });

    // Data return karein frontend ko
    return NextResponse.json(allNews, { status: 200 });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { error: "Data fetch nahi ho saka!" },
      { status: 500 }
    );
  }
}

// ==========================================
// 2. POST METHOD - Nayi News Save Karne Ke Liye
// ==========================================
export async function POST(request: Request) {
  try {
    // Database Connect karein
    await connectDB();

    const body = await request.json();
    const { title, summary, content, category, imageUrl, source, author } = body;

    // Validation Check
    if (!title || !content || !imageUrl) {
      return NextResponse.json(
        { error: "Title, Content, aur Image lazmi hain!" },
        { status: 400 }
      );
    }

    // Security Sanitize (XSS Protection for Rich Text)
    const sanitizedContent = DOMPurify.sanitize(content);

    // Dynamic Unique Slug Generation
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Special characters remove karne ke liye
      .replace(/\s+/g, '-');        // Spaces ko hyphens se replace karne ke liye

    // Agar same slug pehle se database mein ho to unique ID attach karein
    const existingNews = await News.findOne({ slug });
    if (existingNews) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Save to MongoDB Atlas
    const newPost = await News.create({
      title,
      slug,
      summary,
      content: sanitizedContent,
      category,
      imageUrl,
      source: source || 'Khabarnama Report',
      author: author || 'Admin',
    });

    return NextResponse.json({ 
      success: true, 
      message: "News post completely saved to DB! 🎉",
      data: newPost 
    }, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error! Data save nahi ho saka." },
      { status: 500 }
    );
  }
}
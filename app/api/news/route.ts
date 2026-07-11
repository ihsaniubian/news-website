import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

// =========================
// GET ALL NEWS
// =========================
export async function GET() {
  try {
    await connectDB();

    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch news." },
      { status: 500 }
    );
  }
}

// =========================
// ADD NEWS
// =========================
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      summary,
      content,
      category,
      imageUrl,
      image, 
      source,
      author,
    } = body;

    const finalImageUrl = imageUrl || image;

    if (!title || !content || !category || !finalImageUrl) {
      return NextResponse.json(
        {
          error: "Title, Content, Category and Image are required.",
        },
        { status: 400 }
      );
    }

    const cleanTitle = sanitizeHtml(title);
    const cleanSummary = sanitizeHtml(summary || "");
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt"],
      },
    });

    // 🌟 ERROR FIX HERE: 'Business' ko lowercase 'business' banayein
    // Agar aapke model mein camelCase (businessNews) ya kuch aur hai, to '.toLowerCase()' ko hata kar exact string set kar sakte hain
    const cleanCategory = category.trim().toLowerCase();

    let slug = cleanTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const exists = await News.findOne({ slug });

    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }

    const newNews = await News.create({
      title: cleanTitle,
      slug,
      summary: cleanSummary,
      content: cleanContent,
      category: cleanCategory, // Fixed lowercase category passed here
      image: finalImageUrl, 
      imageUrl: finalImageUrl, 
      source: source || "Khabarnama Report",
      author: author || "Admin",
      published: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "News saved successfully.",
        data: newNews,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error Details:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
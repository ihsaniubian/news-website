import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") +
    "-" +
    Date.now().toString().slice(-5)
  );
}

// GET - Get all news
export async function GET() {
  try {
    await dbConnect();

    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json(news, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}

// POST - Add news
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const newNews = await News.create({
      title: body.title,
      slug: body.slug || generateSlug(body.title),
      summary: body.summary || "",
      content: body.content,
      category: body.category,
      imageUrl: body.image || body.imageUrl || "",
      author: body.author || "Admin",
    });

    return NextResponse.json(newNews, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
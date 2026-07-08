import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
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

export async function GET() {
  try {
    await connectDB();

    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json(news, { status: 200 });
  } catch (error: unknown) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const news = await News.create({
      title: body.title,
      slug: body.slug || generateSlug(body.title),
      summary: body.summary || "",
      content: body.content,
      category: body.category,
      imageUrl: body.imageUrl || "",
      source: body.source || "",
      author: "Admin",
      published: true,
    });

    return NextResponse.json(
      {
        success: true,
        news,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
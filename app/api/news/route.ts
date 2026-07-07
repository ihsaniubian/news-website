import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  try {
    await connectDB();

    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json(news, { status: 200 });
  } catch (error: unknown) {
    console.error("GET ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const news = await News.create({
      title: body.title,
      summary: body.summary || "",
      content: body.content,
      category: body.category,
      image: body.image || "",
      author: body.author || "Admin",
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error: unknown) {
    console.error("POST ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
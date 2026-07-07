import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title) + "-" + Date.now().toString().slice(-5);
    }

    const news = await News.create(body);
    return NextResponse.json({ success: true, news });
  } catch (err) {
    console.error("News creation error:", err);
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const news = await News.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, news });
}
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const news = await News.create(body);
    return NextResponse.json({ success: true, news });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const news = await News.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, news });
}
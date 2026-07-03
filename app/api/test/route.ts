import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find({}).sort({ createdAt: -1 });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { message: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const news = await News.create({
      title: body.title,
      content: body.content,
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: String(error) },
      { status: 500 }
    );
  }
}
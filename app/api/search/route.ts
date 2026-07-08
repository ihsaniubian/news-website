import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    await dbConnect();

    // Title aur summary mein keyword search karne ke liye regex query
    const results = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
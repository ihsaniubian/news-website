import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  const newNews = await News.create({
    title: body.title,
    content: body.content,
    category: body.category, // ✅ ADD THIS
  });

  return Response.json(newNews, { status: 201 });
}

export async function GET() {
  await dbConnect();

  const news = await News.find().sort({ createdAt: -1 });

  return Response.json(news);
}
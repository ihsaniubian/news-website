import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  await dbConnect();

  const news = await News.find()
    .sort({ createdAt: -1 });

  return Response.json(news);
}

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  const news = await News.create({
    title: body.title,
    summary: body.summary,
    content: body.content,
    category: body.category,
    image: body.image || "",
    author: body.author || "Admin",
    published: body.published ?? true,
  });

  return Response.json(news, { status: 201 });
}
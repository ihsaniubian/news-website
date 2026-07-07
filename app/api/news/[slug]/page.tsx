import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;

  await dbConnect();

  const news = await News.findOne({ slug }).lean();

  if (!news) {
    notFound();
  }

  const item = JSON.parse(JSON.stringify(news));

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <span className="text-sm uppercase text-blue-600">
        {item.category}
      </span>

      <h1 className="text-4xl font-bold mt-2">
        {item.title}
      </h1>

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-96 object-cover rounded-lg my-6"
        />
      )}

      <p className="text-lg text-gray-500 mb-6">
        {item.summary}
      </p>

      <article className="prose max-w-none whitespace-pre-line">
        {item.content}
      </article>

      {item.source && (
        <p className="mt-8 text-sm text-gray-500">
          Source: {item.source}
        </p>
      )}
    </main>
  );
}
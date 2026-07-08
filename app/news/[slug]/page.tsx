export const dynamic = 'force-dynamic'; // <--- Live data ke liye zaroori hai

import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";
import { notFound } from "next/navigation";

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}

// Next.js params ko promise ke tor par pass karta hai
interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSingleNews(slug: string): Promise<NewsItem | null> {
  await dbConnect();
  // Database se slug match kar rahe hain
  const singleNews = await News.findOne({ slug: slug }).lean();
  if (!singleNews) return null;
  return JSON.parse(JSON.stringify(singleNews));
}

export default async function NewsDetailPage({ params }: PageProps) {
  // params ko await karna zaroori hai Next.js v13+ / v14 / v15 mein
  const resolvedParams = await params;
  const news = await getSingleNews(resolvedParams.slug);

  // Agar news nahi milti toh Next.js ka default 404 page dikhayein
  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <Link href="/" className="text-[var(--color-accent)] hover:underline text-sm flex items-center gap-2 mb-6">
        ← Back to Home
      </Link>

      <article>
        <span className="text-xs uppercase bg-[var(--color-accent)] text-black font-semibold px-2 py-1 rounded">
          {news.category}
        </span>
        
        <h1 className="text-4xl font-bold mt-4 mb-4">{news.title}</h1>
        
        <div className="text-sm text-gray-400 mb-6">
          By {news.author} • {new Date(news.createdAt).toLocaleDateString()}
        </div>

        {news.imageUrl && (
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <p className="text-xl text-gray-300 font-medium mb-6 leading-relaxed">
          {news.summary}
        </p>

        <div className="text-lg text-gray-200 leading-relaxed whitespace-pre-wrap">
          {news.content}
        </div>
      </article>
    </div>
  );
}
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

const ticker = [
  "Markets open higher amid global rally",
  "Central bank holds interest rates steady",
  "New tech policy draft released for public feedback",
  "Regional trade talks resume after brief pause",
];

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

async function getLatestNews(): Promise<NewsItem[]> {
  await dbConnect();
  const news = await News.find().sort({ createdAt: -1 }).limit(12).lean();
  return JSON.parse(JSON.stringify(news));
}

export default async function Home() {
  const newsList = await getLatestNews();

  return (
    <div className="min-h-screen">

      {/* Ticker */}
      <div className="bg-[var(--color-accent)] text-black overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block animate-marquee font-[family-name:var(--font-mono)] text-sm font-medium">
          {ticker.map((item, i) => (
            <span key={i} className="mx-8">
              ● {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)]/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
            Khabar
            <span className="text-[var(--color-accent)]">nama</span>
          </h1>

          <nav className="hidden md:flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/pakistan">Pakistan</Link>
            <Link href="/world">World</Link>
            <Link href="/politics">Politics</Link>
            <Link href="/sports">Sports</Link>
            <Link href="/business">Business</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">
          Khabarnama
        </h1>

        <p className="mb-8 text-gray-400">
          Latest News from Pakistan and Around the World
        </p>

        {newsList.length === 0 ? (
          <p className="text-gray-500">No news published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsList.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item.slug}`}
                className="block border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <span className="text-xs uppercase text-[var(--color-accent)]">
                  {item.category}
                </span>
                <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                <p className="text-sm text-gray-400 mt-2">{item.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--color-border)] mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Khabarnama. All rights reserved.</p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <Link href="/">Home</Link>
            <Link href="/pakistan">Pakistan</Link>
            <Link href="/world">World</Link>
            <Link href="/politics">Politics</Link>
            <Link href="/sports">Sports</Link>
            <Link href="/business">Business</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
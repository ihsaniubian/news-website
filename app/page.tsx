import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';
import NewsCard from '@/components/NewsCard';

// Next.js ko batane ke liye ke data dynamic fetch ho (SSR)
export const revalidate = 0; 

async function getLatestNews() {
  try {
    await connectDB();
    // Database se letest 6 news records fetch karein
    const newsData = await News.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    
    // Server components ke liye Mongoose IDs ko safe string mein convert karna
    return JSON.parse(JSON.stringify(newsData));
  } catch (error) {
    console.error("Homepage data fetching error:", error);
    return [];
  }
}

export default async function HomePage() {
  const allNews = await getLatestNews();

  // Breaking News (Sabse latest post)
  const breakingNews = allNews[0];
  // Baki bachi hui posts ka grid
  const regularNews = allNews.slice(1);

  return (
    <main className="min-h-screen bg-[#0f0f12] text-white px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Branding */}
        <header className="border-b border-gray-800 pb-6 mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            KHABARNAMA<span className="text-orange-500">.</span>
          </h1>
          <p className="text-gray-400 text-xs mt-2 font-mono uppercase tracking-widest">
            Taza Tareen Surkhiyan • Live News Portal
          </p>
        </header>

        {allNews.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#131316]">
            <p className="text-gray-400 text-lg">Abhi tak koi khabar upload nahi ki gayi.</p>
            <p className="text-gray-600 text-xs mt-1">Admin panel se pehli news post publish karein!</p>
          </div>
        ) : (
          <>
            {/* 🔥 Hero Breaking News Banner */}
            {breakingNews && (
              <section className="mb-12">
                <h2 className="text-orange-500 text-xs uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 bg-red-600 rounded-full animate-ping"></span> Breaking News
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#16161a] border border-gray-800 rounded-2xl overflow-hidden p-4 md:p-6 hover:border-gray-700 transition-all">
                  <div className="lg:col-span-7 h-64 md:h-96 relative rounded-xl overflow-hidden bg-gray-900">
                    <img 
                      src={breakingNews.imageUrl} 
                      alt={breakingNews.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center py-2">
                    <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider mb-2">{breakingNews.category}</span>
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                      <a href={`/news/${breakingNews.slug}`} className="hover:text-orange-400 transition-colors">
                        {breakingNews.title}
                      </a>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                      {breakingNews.summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                      <span>By Admin</span>
                      <span>{new Date(breakingNews.createdAt).toLocaleDateString('en-PK')}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 📰 News Feed Grid Section */}
            <section>
              <h2 className="text-xl font-extrabold text-white mb-6 tracking-tight border-l-4 border-orange-500 pl-3">
                Latest Updates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map((post: any) => (
                  <NewsCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          </>
        )}

      </div>
    </main>
  );
}
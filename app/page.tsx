export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';
import NewsCard from '@/components/NewsCard';
import Link from 'next/link';
import Script from 'next/script';

async function getLatestNews() {
  try {
    await connectDB();
    const newsData = await News.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(newsData));
  } catch (error) {
    console.error("Homepage data fetching error:", error);
    return [];
  }
}

export default async function HomePage() {
  const newsList = await getLatestNews();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F5F5F0] font-sans">
      {/* 📰 HERO SECTION / HEADER */}
      <header className="border-b border-[#2a2e38] bg-[#12151D] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-wider text-white uppercase bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Khabarnama
            </h1>
            <p className="text-[11px] text-[#9CA3AF] tracking-widest uppercase mt-1">Truth First • Live News Portal</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-400 tracking-wider uppercase">Live Updates</span>
          </div>
        </div>
      </header>

      {/* 🏷️ AD SPOT 1: TOP BANNER */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-center">
        <div className="w-full max-w-[728px] min-h-[90px] bg-[#12151D] border border-[#2a2e38] rounded-xl flex flex-col items-center justify-center text-xs text-gray-500 overflow-hidden relative">
          <span className="absolute top-1 left-2 text-[9px] uppercase tracking-widest text-gray-600">Advertisement</span>
          <div id="container-2212f5dc5b48b4407de6172af0479e77" className="z-10"></div>
        </div>
      </div>

      {/* 🚀 MAIN BODY */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between border-l-4 border-blue-500 pl-4">
          <h2 className="text-xl font-bold tracking-wide text-white">Latest Headlines</h2>
          <p className="text-xs text-[#9CA3AF]">Showing newest articles</p>
        </div>

        {/* 🏷️ AD SPOT 2: MID CONTENT BANNER */}
        <div className="w-full max-w-[728px] mx-auto min-h-[280px] mb-8 bg-[#12151D] border border-[#2a2e38] rounded-xl flex flex-col items-center justify-center text-xs text-gray-500 overflow-hidden relative p-4">
          <span className="absolute top-1 left-2 text-[9px] uppercase tracking-widest text-gray-600">Sponsored</span>
          <div id="container-63ea9891a4e05ca6b508928908866ef7" className="z-10 mt-2"></div>
        </div>

        {newsList.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#2a2e38] rounded-2xl bg-[#12151D]">
            <p className="text-[#9CA3AF] font-medium">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((article: any) => (
              <NewsCard key={article._id} post={article} />
            ))}
          </div>
        )}
      </main>

      {/* ⚡ MASTER SCRIPT FOR BOTH ADS */}
      <Script id="adsterra-master-script" strategy="afterInteractive">
        {`
          (function() {
            // Ad 1
            window.atOptions1 = {
              'key' : '2212f5dc5b48b4407de6172af0479e77',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
            const s1 = document.createElement('script');
            s1.src = 'https://www.highperformanceformat.com/2212f5dc5b48b4407de6172af0479e77/invoke.js';
            document.getElementById('container-2212f5dc5b48b4407de6172af0479e77').appendChild(s1);

            // Ad 2
            window.atOptions2 = {
              'key' : '63ea9891a4e05ca6b508928908866ef7',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
            const s2 = document.createElement('script');
            s2.src = 'https://www.highperformanceformat.com/63ea9891a4e05ca6b508928908866ef7/invoke.js';
            document.getElementById('container-63ea9891a4e05ca6b508928908866ef7').appendChild(s2);
          })();
        `}
      </Script>

      {/* 📌 FOOTER */}
      <footer className="bg-[#12151D] border-t border-[#2a2e38] py-8 mt-20 text-center text-xs text-[#9CA3AF]">
        <p>© 2026 Khabarnama Digital Network. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
'use client'; // Client component zaroori hai ads ke liye

import { useEffect, useState } from 'react';
import AdUnit from '@/components/AdUnit';
import NewsCard from '@/components/NewsCard';
import Link from 'next/link';

export default function HomePage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Data fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F5F5F0] font-sans">
      <header className="border-b border-[#2a2e38] bg-[#12151D] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-black text-white uppercase bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Khabarnama
          </h1>
          <span className="text-xs font-medium text-green-400 uppercase">Live Updates</span>
        </div>
      </header>

      {/* AD SPOT 1 - Corrected Props */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-center">
        <div className="w-full max-w-[728px] min-h-[90px] bg-[#12151D] border border-[#2a2e38] rounded-xl flex items-center justify-center relative">
          <AdUnit adKey="2212f5dc5b48b4407de6172af0479e77" id="ad-top" width={728} height={90} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Latest Headlines</h2>

        {/* AD SPOT 2 - Corrected Props */}
        <div className="w-full max-w-[728px] mx-auto min-h-[280px] mb-8 bg-[#12151D] border border-[#2a2e38] rounded-xl flex items-center justify-center relative p-4">
          <AdUnit adKey="63ea9891a4e05ca6b508928908866ef7" id="ad-mid" width={300} height={250} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((article: any) => (
            <NewsCard key={article._id} post={article} />
          ))}
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-[#9CA3AF] border-t border-[#2a2e38]">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link>
        </div>
        <p>© 2026 Khabarnama Digital Network. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
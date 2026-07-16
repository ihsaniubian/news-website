'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsCard from '@/components/NewsCard';
import Link from 'next/link';

export default function HomePage() {
  const [newsList, setNewsList] = useState([]);

  // 🔌 Ad Network Scripts Injector
  useEffect(() => {
    // === 1. TOP AD (728x90) ===
    (window as any).atOptions = {
      'key' : '2212f5dc5b48b4407de6172af0479e77',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };

    const scriptTop = document.createElement('script');
    scriptTop.src = "https://www.highperformanceformat.com/2212f5dc5b48b4407de6172af0479e77/invoke.js";
    scriptTop.async = true;

    const topAdContainer = document.getElementById('header-ad-placement');
    if (topAdContainer) {
      topAdContainer.appendChild(scriptTop);
    }

    // === 2. MID AD / KHABAR_NICHE AD (300x250) ===
    const midAtOptions = {
      'key' : '63ea9891a4e05ca6b508928908866ef7',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };

    const scriptMid = document.createElement('script');
    scriptMid.src = "https://www.highperformanceformat.com/63ea9891a4e05ca6b508928908866ef7/invoke.js";
    scriptMid.async = true;

    scriptMid.onload = () => {
      (window as any).atOptions = midAtOptions;
    };

    const midAdContainer = document.getElementById('mid-ad-placement');
    if (midAdContainer) {
      midAdContainer.appendChild(scriptMid);
    }

    // Cleanup to prevent duplicate ads on dynamic route changes
    return () => {
      if (topAdContainer) topAdContainer.innerHTML = '';
      if (midAdContainer) midAdContainer.innerHTML = '';
    };
  }, []);

  // 📡 Fetch Latest News from MongoDB API
  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Data fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F5F5F0] font-sans">
      
      {/* HEADER SECTION */}
      <header className="border-b border-[#2a2e38] bg-[#12151D] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
          
          {/* Logo and Live Status Row */}
          <div className="flex justify-between items-center">
            
            {/* 🖼️ BRAND IMAGE LOGO (Direct URL Bypass to prevent broken image) */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <Image 
  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=180&h=180&fit=crop" 
  alt="WS Website Logo" 
  width={80}   
  height={80}   
  className="object-contain max-h-[80px] rounded-lg"
  priority      
/>
            </Link>

            <span className="text-xs font-medium text-green-400 uppercase tracking-wider bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              Live Updates
            </span>
          </div>

          {/* 🎯 Header Ad Placement Slot (728x90) */}
          <div className="flex justify-center w-full mt-2">
            <div 
              id="header-ad-placement" 
              className="w-full max-w-[728px] min-h-[90px] bg-[#1a1d26]/40 border border-[#2a2e38] rounded-xl flex items-center justify-center overflow-hidden"
            >
              {/* Top Banner Ad automatically injects here */}
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 🎯 Mid Ad Slot (300x250) Below Header */}
        <div className="flex justify-center w-full mb-10">
          <div 
            id="mid-ad-placement" 
            className="w-[300px] min-h-[250px] bg-[#1a1d26]/40 border border-[#2a2e38] rounded-xl flex items-center justify-center overflow-hidden"
          >
            {/* Box Ad automatically injects here */}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Latest Headlines</h2>

        {/* Dynamic News Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.length > 0 ? (
            newsList.map((article: any) => (
              <NewsCard key={article._id} post={article} />
            ))
          ) : (
            <p className="text-sm text-gray-500 italic col-span-full text-center">
              Khabarnama load ho raha hai ya koi post nahi mili...
            </p>
          )}
        </div>
      </main>

      {/* FOOTER */}
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
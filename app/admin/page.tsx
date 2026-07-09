'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        if (res.ok) setNewsList(data);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Kya aap waqai is khabar ko delete karna chahte hain?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Khabar kamyabi se uradi gayi!');
        setNewsList(newsList.filter(item => item._id !== id));
      }
    } catch (err) {
      alert('Delete karne mein error aaya.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#121212] text-white p-6 flex items-center justify-center">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-8">
        <h1 className="text-2xl font-black text-orange-500">⚙️ Khabarnama Admin Control</h1>
        <div className="flex gap-3">
          <Link href="/" className="text-xs bg-gray-800 text-gray-300 px-4 py-2 rounded font-bold">🏠 Home Page</Link>
          <Link href="/admin/add-news" className="text-xs bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-bold">➕ Add New Post</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1e1e1e] p-4 rounded border border-gray-800">
          <p className="text-xs text-gray-400 font-bold uppercase">Total Published Articles</p>
          <h2 className="text-3xl font-black text-orange-400 mt-1">{newsList.length}</h2>
        </div>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded border border-gray-800">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Manage Existing News</h3>
        {newsList.length === 0 ? (
          <p className="text-xs text-gray-500">Abhi tak koi khabar database mein upload nahi hui.</p>
        ) : (
          <div className="divide-y divide-gray-800">
            {newsList.map((news) => (
              <div key={news._id} className="py-3 flex justify-between items-center gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {news.imageUrl && <img src={news.imageUrl} className="w-10 h-10 object-cover rounded bg-black flex-shrink-0" alt="" />}
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-200 truncate max-w-md">{news.title}</h4>
                    <span className="text-[10px] text-orange-400 font-semibold uppercase">{news.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(news._id)} className="text-[11px] bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1 rounded transition-colors font-bold">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
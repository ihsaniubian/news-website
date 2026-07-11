'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// TypeScript Interface matching your MongoDB News Schema precisely
interface Article {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  image?: string; // Added safe backup fallback
  status?: string; 
  views?: any; // Changed to any safely to handle String or Number from DB
  createdAt?: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from your freshly completed API
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch data from live API');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ==========================================
  // DYNAMIC STATS CALCULATIONS (FIXED DATA TYPES)
  // ==========================================
  // Saare articles ke views ko plus karne ke liye logic (Number conversion lagayi hai)
  const totalViews = articles.reduce((acc, curr) => {
    const viewCount = curr.views ? Number(curr.views) : 0;
    return acc + (isNaN(viewCount) ? 0 : viewCount);
  }, 0);

  // 💰 STRICT FORMULA: 10 Views = $1 (Yaani per view $0.10)
  const earningRate = 0.10; 
  const totalEarnings = totalViews * earningRate;

  // ==========================================
  // DELETE HANDLER FUNCTION
  // ==========================================
  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Kya aap waqai is article ko delete karna chahte hain?\n"${title}"`);
    
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Article successfully delete ho gaya!');
        setArticles(articles.filter(article => article._id !== id));
      } else {
        const data = await response.json();
        alert(`Delete failed: ${data.error || 'Unknown error occurred'}`);
      }
    } catch (err) {
      console.error("Delete request error:", err);
      alert('Network error! Article delete nahi ho saka.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white tracking-wide">Breaking-X</h1>
          <p className="text-xs text-slate-400 mt-1">Pakistan & World News</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <a href="#" className="flex items-center space-x-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium">
            <span className="w-5 text-center">📊</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg transition">
            <span className="w-5 text-center">📄</span>
            <span>All Articles</span>
          </a>
          <Link href="/admin/add-news" className="flex items-center space-x-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg transition">
            <span className="w-5 text-center">➕</span>
            <span>Add New Article</span>
          </Link>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg transition">
            <span className="w-5 text-center">📁</span>
            <span>Categories</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <a href="#" className="flex items-center space-x-3 text-red-400 hover:bg-slate-800 px-4 py-3 rounded-lg transition">
            <span className="w-5 text-center">🚪</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
          <button className="text-slate-600 md:hidden">☰</button>
          <div className="flex items-center space-x-6 ml-auto">
            <div className="relative cursor-pointer">
              <span className="text-xl text-slate-600">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">5</span>
            </div>
            <div className="flex items-center space-x-3 border-l pl-6 border-slate-200">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">A</div>
              <div>
                <p className="text-sm font-semibold text-slate-800 leading-none">Admin</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Inner Body */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1">Welcome back, Admin! Here's what's happening with your news website.</p>
            </div>
            <Link href="/admin/add-news" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 shadow-sm transition">
              <span>+ Add New Article</span>
            </Link>
          </div>

          {/* Dynamic Stats Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Total Articles Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-start justify-between shadow-sm">
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Total Articles</p>
                <h3 className="text-3xl font-bold text-slate-800">{loading ? '...' : articles.length}</h3>
                <span className="inline-block text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">Live count</span>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg text-xl">📄</div>
            </div>

            {/* Total Views Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-start justify-between shadow-sm">
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Total Views</p>
                <h3 className="text-3xl font-bold text-slate-800">{loading ? '...' : totalViews.toLocaleString()}</h3>
                <span className="inline-block text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">Analytics</span>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-lg text-xl">👁️</div>
            </div>

            {/* Total Earnings Card (10 Views = $1) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-start justify-between shadow-sm">
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Total Earnings</p>
                <h3 className="text-3xl font-bold text-emerald-600">
                  {loading ? '...' : `$${totalEarnings.toFixed(2)}`}
                </h3>
                <span className="inline-block text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">Estimated Revenue</span>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg text-xl">💰</div>
            </div>

          </div>

          {/* Table & Quick Actions Block */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Live Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-slate-800">Recent Articles</h4>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">View All</a>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Loading live dashboard data...</div>
                ) : error ? (
                  <div className="p-8 text-center text-red-500 font-medium">Error linking database: {error}</div>
                ) : articles.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 font-medium">No articles in database yet. Add your first piece of news!</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                        <th className="p-4">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Views</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                      {articles.map((article) => {
                        const displayImg = article.imageUrl || article.image;
                        return (
                          <tr key={article._id} className="hover:bg-slate-50/70 transition">
                            <td className="p-4 font-medium text-slate-900 max-w-[240px] flex items-center space-x-3">
                              {displayImg && (
                                <img 
                                  src={displayImg} 
                                  alt={article.title} 
                                  className="w-10 h-10 object-cover rounded-lg flex-shrink-0 bg-slate-100"
                                />
                              )}
                              <span className="truncate">{article.title}</span>
                            </td>
                            <td className="p-4">
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium capitalize">
                                {article.category || 'General'}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`text-xs px-2 py-1 rounded font-medium ${
                                article.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                              }`}>
                                {article.status || 'Published'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-500">
                              {article.views !== undefined ? article.views : 0}
                            </td>
                            <td className="p-4 text-slate-500 whitespace-nowrap">
                              {article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                            </td>
                            <td className="p-4 text-center space-x-2 whitespace-nowrap">
                              <Link 
                                href={`/admin/edit-news/${article._id}`}
                                className="inline-flex items-center justify-center p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded transition mr-1"
                                title="Edit Article"
                              >
                                ✏️
                              </Link>
                              <button 
                                onClick={() => handleDelete(article._id, article.title)}
                                className="inline-flex items-center justify-center p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition"
                                title="Delete Article"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 mb-2">Quick Actions</h4>
              
              <Link href="/admin/add-news" className="flex items-center space-x-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition cursor-pointer">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm">➕</div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-800">Add New Article</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Create a new news article</p>
                </div>
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
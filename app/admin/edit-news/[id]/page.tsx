'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('business');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch Existing Article Data
  useEffect(() => {
    async function getArticleDetails() {
      try {
        const res = await fetch(`/api/news`); // Getting all to find or make a specific get endpoint
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        
        // Find current article from array
        const article = data.find((item: any) => item._id === id);
        
        if (article) {
          setTitle(article.title || '');
          setCategory(article.category || 'business');
          setSummary(article.summary || '');
          setContent(article.content || '');
          setImageUrl(article.imageUrl || article.image || '');
        } else {
          setError('Article not found in database.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    }
    if (id) getArticleDetails();
  }, [id]);

  // 2. Handle Submit (PUT request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          summary,
          content,
          imageUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Article successfully update ho gaya!');
        router.push('/admin'); // Redirect back to dashboard
      } else {
        setError(result.error || 'Failed to update article.');
      }
    } catch (err) {
      setError('Network error. Update nahi ho saka.');
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) return <div className="p-8 text-center font-medium text-slate-600">Article data load ho raha hai...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
        
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">✏️ Edit News Article</h2>
            <p className="text-xs text-slate-500 mt-1">Make changes to your article values below</p>
          </div>
          <Link href="/admin" className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition">
            ← Back
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-700">
          <div>
            <label className="block font-semibold mb-1 text-slate-800">Article Title *</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-blue-500" 
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-800">Category *</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 p-2.5 rounded-lg bg-white capitalize focus:outline-blue-500"
              >
                <option value="business">Business</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="entertainment">Entertainment</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-800">Image URL</label>
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-blue-500"
                placeholder="Cloudinary URL"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-800">Short Summary</label>
            <textarea 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-slate-200 p-2.5 rounded-lg h-20 resize-none focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-800">Full Content *</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-slate-200 p-2.5 rounded-lg h-44 focus:outline-blue-500"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow transition disabled:bg-blue-400"
          >
            {submitting ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
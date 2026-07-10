'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNews() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states matching your API body parameters
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'General',
    imageUrl: '',
    source: '',
    author: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kuch galti hui hai!');
      }

      setMessage({ type: 'success', text: 'News successfully published! 🎉' });
      
      // Post hone ke baad wapas admin dashboard par le jayega 2 seconds baad
      setTimeout(() => {
        router.push('/admin');
      }, 2000);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Create New Article</h2>
            <p className="text-sm text-slate-500 mt-1">Fill out the details below to publish news to Khabarnama.</p>
          </div>
          <button 
            onClick={() => router.push('/admin')} 
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition"
          >
            ← Back
          </button>
        </div>

        {/* Status Messages */}
        {message.text && (
          <div className={`p-4 rounded-xl font-medium text-sm text-center ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Article Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Pakistan Cricket Team Won the Series"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Category */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800 bg-white"
              >
                <option value="General">General</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="World">World</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Image URL *</label>
              <input
                type="text"
                name="imageUrl"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Short Summary</label>
            <textarea
              name="summary"
              rows={2}
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief summary of the article..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800 resize-none"
            />
          </div>

          {/* Main Content Body */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Full Content *</label>
            <textarea
              name="content"
              required
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write or paste your main article content body here..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Author */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Author Name</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Admin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800"
              />
            </div>

            {/* Source */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">News Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Khabarnama Report"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition text-slate-800"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-5 py-2.5 rounded-xl border text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
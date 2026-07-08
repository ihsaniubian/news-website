'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Pakistan',
    imageUrl: '',
    source: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('🎉 News published successfully!');
        setFormData({ title: '', content: '', category: 'Pakistan', imageUrl: '', source: '' });
      } else {
        setMessage('❌ Failed to publish news. Try again.');
      }
    } catch (error) {
      setMessage('❌ An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 text-white rounded-lg shadow-md my-10">
      <h1 className="text-2xl font-bold mb-6 text-center border-b border-slate-700 pb-3">
        Khabarnama Admin Panel
      </h1>

      {message && (
        <div className={`p-3 rounded mb-4 text-center ${message.includes('❌') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            rows={5}
            required
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Pakistan">Pakistan</option>
            <option value="International">International</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Cloudinary Image Uploader */}
        <div>
          <label className="block text-sm font-medium mb-2">News Image</label>
          <ImageUploader 
            onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })} 
          />
          {formData.imageUrl && (
            <p className="text-xs text-green-400 mt-1">✓ Image uploaded successfully!</p>
          )}
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <input
            type="text"
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
            value={formData.source}
            placeholder="e.g., Dawn, Geo News"
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.imageUrl}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed font-medium rounded transition"
        >
          {loading ? 'Publishing...' : 'Publish News'}
        </button>
      </form>
    </div>
  );
}
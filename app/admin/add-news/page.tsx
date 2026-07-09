"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function AddNewsPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Pakistan");
  const [imageUrl, setImageUrl] = useState(""); // 🔗 Isme image uploader ka secure link save hoga
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations check
    if (!title || !content || !imageUrl) {
      alert("Title, Full Content aur Feature Image upload karna lazmi hai!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          summary, 
          content, 
          category, 
          imageUrl,
          published: true 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("News Article Published Successfully! 🎉");
        // Form states reset karein
        setTitle("");
        setSummary("");
        setContent("");
        setImageUrl("");
        setCategory("Pakistan");
      } else {
        alert(`Error: ${result.error || "Failed to publish news"}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Backend connection failed. Something went wrong while saving news!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f12] text-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#131316] p-6 rounded-2xl border border-gray-800 shadow-xl">
        
        {/* Header Title */}
        <div className="border-b border-gray-800 pb-4 mb-6">
          <h2 className="text-xl font-black tracking-tight text-white uppercase">
            Khabarnama <span className="text-orange-500">Publisher Desk</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Database mein naye dynamic news post publish karein
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Headline Title */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5">
              News Title / Headline <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3.5 bg-[#16161a] border border-gray-800 rounded-xl focus:border-orange-500 outline-none text-white text-sm transition-all placeholder:text-gray-600" 
              placeholder="Enter eye-catching headline..." 
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5">
              Select Category <span className="text-red-500">*</span>
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3.5 bg-[#16161a] border border-gray-800 rounded-xl focus:border-orange-500 outline-none text-white text-sm transition-all cursor-pointer"
            >
              <option value="Pakistan">Pakistan</option>
              <option value="Politics">Politics</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="World">World</option>
              <option value="Tech">Tech</option>
            </select>
          </div>

          {/* 📸 Cloudinary Integrated Image Uploader */}
          <div className="border border-gray-800 bg-[#16161a]/30 p-4 rounded-xl">
            <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
          </div>

          {/* Summary textarea */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5">
              Short Summary / Excerpt
            </label>
            <textarea 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3.5 bg-[#16161a] border border-gray-800 rounded-xl focus:border-orange-500 outline-none text-white text-sm h-20 resize-none transition-all placeholder:text-gray-600" 
              placeholder="Short 2-line intro description for home cards..."
            />
          </div>

          {/* Content textarea */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5">
              Full News Body Content <span className="text-red-500">*</span>
            </label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3.5 bg-[#16161a] border border-gray-800 rounded-xl focus:border-orange-500 outline-none text-white text-sm h-44 transition-all placeholder:text-gray-600" 
              placeholder="Write full news article details here..." 
              required
            />
          </div>

          {/* Submit/Publish Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold text-sm rounded-xl transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-lg shadow-orange-600/10"
          >
            {loading ? "Publishing Post..." : "Publish News Article 🚀"}
          </button>

        </form>
      </div>
    </main>
  );
}
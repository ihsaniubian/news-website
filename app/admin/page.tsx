"use client";
import { useState } from "react";

export default function AddNews() {
  const [form, setForm] = useState({
    title: "", slug: "", summary: "", content: "",
    category: "pakistan", imageUrl: "", source: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(data.success ? "News added!" : "Error: " + data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <input placeholder="Title" className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Slug (url-friendly)" className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, slug: e.target.value })} />
      <textarea placeholder="Summary" className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, summary: e.target.value })} />
      <textarea placeholder="Full Content" rows={6} className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, content: e.target.value })} />
      <select className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option value="pakistan">Pakistan</option>
        <option value="world">World</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
        <option value="tech">Tech</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <input placeholder="Image URL" className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
      <input placeholder="Source" className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, source: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Publish News
      </button>
      <p>{status}</p>
    </form>
  );
}
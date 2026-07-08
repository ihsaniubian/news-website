"use client";

import { useState } from "react";

export default function AddNews() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "pakistan",
    imageUrl: "",
    source: "",
  });

  const [status, setStatus] = useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("Saving...");

    const res = await fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("News added!");

      setForm({
        title: "",
        slug: "",
        summary: "",
        content: "",
        category: "pakistan",
        imageUrl: "",
        source: "",
      });
    } else {
      setStatus(data.error || "Failed to add news");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add News</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
              slug: generateSlug(e.target.value),
            })
          }
        />

        <input
          className="w-full border p-3 rounded bg-gray-100"
          placeholder="Slug"
          value={form.slug}
          readOnly
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Summary"
          rows={3}
          value={form.summary}
          onChange={(e) =>
            setForm({
              ...form,
              summary: e.target.value,
            })
          }
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Content"
          rows={8}
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
        />

        <select
          className="w-full border p-3 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        >
          <option value="pakistan">Pakistan</option>
          <option value="world">World</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="tech">Tech</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <input
          className="w-full border p-3 rounded"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({
              ...form,
              imageUrl: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Source"
          value={form.source}
          onChange={(e) =>
            setForm({
              ...form,
              source: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Publish News
        </button>

        <p>{status}</p>
      </form>
    </div>
  );
}
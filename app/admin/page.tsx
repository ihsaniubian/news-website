"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [category, setCategory] = useState("Pakistan");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        summary,
        content,
        author,
        category,
      }),
    });

    if (res.ok) {
      alert("News Added Successfully!");

      setTitle("");
      setSummary("");
      setContent("");
      setAuthor("Admin");
      setCategory("Pakistan");
    } else {
      alert("Failed to add news");
    }
  }

  return (
    <main style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Khabarnama Admin Panel</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="News Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="Pakistan">Pakistan</option>
          <option value="World">World</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Business">Business</option>
        </select>

        <textarea
          placeholder="News Content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Publish News
        </button>
      </form>
    </main>
  );
}
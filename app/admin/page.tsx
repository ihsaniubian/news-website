"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        content,
        category,
      }),
    });

    if (res.ok) {
      alert("News Added Successfully!");
      setTitle("");
      setContent("");
      setCategory("Pakistan");
    } else {
      alert("Failed to add news");
    }
  }

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Add News (Khabarnama Admin)</h1>

      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="Pakistan">Pakistan</option>
          <option value="World">World</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
        </select>

        {/* CONTENT */}
        <textarea
          placeholder="News Content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "black",
            color: "white",
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
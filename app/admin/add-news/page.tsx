"use client";

import { useState } from "react";

export default function AddNewsPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          summary,
          content,
          category,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("News Added Successfully!");

        setTitle("");
        setSummary("");
        setContent("");
        setCategory("");
      } else {
        alert(data.message || "Failed to add news");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <main style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1>Add News</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Publish News
        </button>
      </form>
    </main>
  );
}
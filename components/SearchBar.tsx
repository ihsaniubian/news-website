"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // External click handler to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API call without state setting conflicts
  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setResults(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Handle input changes and safely clean results if query is short
  const handleInputChange = (val: string) => {
    setQuery(val);
    if (val.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xs md:max-w-sm">
      <div className="relative">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          className="w-full bg-[var(--color-bg)] text-white placeholder-gray-400 border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-[var(--color-accent)] transition"
        />
        {loading && (
          <div className="absolute right-3 top-2.5 w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute right-0 mt-2 w-full bg-[#121212] border border-[var(--color-border)] rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="block px-4 py-2.5 hover:bg-zinc-900 border-b border-zinc-800 last:border-0 transition"
            >
              <span className="text-[10px] uppercase text-[var(--color-accent)] block font-medium">
                {item.category}
              </span>
              <span className="text-sm text-gray-200 font-medium line-clamp-1">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && !loading && (
        <div className="absolute right-0 mt-2 w-full bg-[#121212] border border-[var(--color-border)] rounded-lg p-4 text-center text-sm text-gray-400 z-50">
          No results found
        </div>
      )}
    </div>
  );
}
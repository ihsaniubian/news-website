import Link from "next/link";

const pakistanNews = [
  {
    title: "Govt announces new digital tax policy for freelancers",
    summary:
      "The federal government has unveiled a new framework aimed at formalizing income from online freelance work.",
    category: "Business",
    time: "2 hours ago",
  },
  {
    title: "Heatwave alert issued across Punjab and Sindh",
    summary:
      "Meteorological department warns of temperatures crossing 45°C in major cities this week.",
    category: "Weather",
    time: "4 hours ago",
  },
  {
    title: "PSL franchise announces new training academy",
    summary:
      "A new cricket academy aimed at grassroots talent will open in three major cities.",
    category: "Sports",
    time: "6 hours ago",
  },
  {
    title: "Karachi metro project enters second construction phase",
    summary:
      "Officials say the expanded transit line will reduce daily commute times for over 200,000 residents.",
    category: "Infrastructure",
    time: "8 hours ago",
  },
  {
    title: "Textile exports rise for third consecutive month",
    summary:
      "Industry data shows a steady increase in exports to European and Gulf markets.",
    category: "Business",
    time: "10 hours ago",
  },
  {
    title: "Islamabad hosts regional education summit",
    summary:
      "Delegates discussed curriculum reform and access to technology in public schools.",
    category: "Education",
    time: "12 hours ago",
  },
];

export default function Pakistan() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)]/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
              Khabar
              <span className="text-[var(--color-accent)]">nama</span>
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-[var(--color-accent)] text-black text-xs font-[family-name:var(--font-mono)] font-semibold px-2 py-1 uppercase">
            Pakistan
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Latest from Pakistan
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pakistanNews.map((item, i) => (
            <article
              key={i}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-lg hover:border-[var(--color-accent)] transition-colors"
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-accent-2)] uppercase">
                {item.category}
              </span>

              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mt-2 mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                {item.summary}
              </p>

              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                {item.time}
              </span>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-[var(--color-border)] mt-16 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <p>© 2026 Khabarnama. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-[var(--color-text)]">
              Home
            </Link>
            <Link href="/pakistan" className="hover:text-[var(--color-text)]">
              Pakistan
            </Link>
            <Link href="/world" className="hover:text-[var(--color-text)]">
              World
            </Link>
            <Link href="/politics" className="hover:text-[var(--color-text)]">
              Politics
            </Link>
            <Link href="/sports" className="hover:text-[var(--color-text)]">
              Sports
            </Link>
            <Link href="/business" className="hover:text-[var(--color-text)]">
              Business
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
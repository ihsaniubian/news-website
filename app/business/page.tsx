import Link from "next/link";

const businessNews = [
  {
    title: "Govt announces new digital tax policy for freelancers",
    summary:
      "The federal government has unveiled a new framework aimed at formalizing income from online freelance work.",
    time: "2 hours ago",
  },
  {
    title: "Textile exports rise for third consecutive month",
    summary:
      "Industry data shows a steady increase in exports to European and Gulf markets.",
    time: "10 hours ago",
  },
  {
    title: "Stock market closes higher amid strong quarterly earnings",
    summary:
      "Investor sentiment improved following better-than-expected results from major listed companies.",
    time: "4 hours ago",
  },
  {
    title: "Central bank holds interest rates steady",
    summary:
      "Policymakers cited stable inflation figures as the main reason for maintaining current rates.",
    time: "6 hours ago",
  },
  {
    title: "Startup funding rounds see renewed activity this quarter",
    summary:
      "Several early-stage companies in fintech and e-commerce closed new funding rounds this month.",
    time: "9 hours ago",
  },
];

export default function Business() {
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
            Business
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Business & Economy
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {businessNews.map((item, i) => (
            <article
              key={i}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-lg hover:border-[var(--color-accent)] transition-colors"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2 leading-snug">
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
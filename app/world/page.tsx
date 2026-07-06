import Link from "next/link";

const worldNews = [
  {
    title: "Global tech firms announce joint AI safety pact",
    country: "USA",
    category: "Technology",
    time: "1 hour ago",
  },
  {
    title: "New trade corridor agreement signed between regional blocs",
    country: "India",
    category: "Business",
    time: "3 hours ago",
  },
  {
    title: "Gulf states expand visa-free travel arrangements",
    country: "UAE",
    category: "Politics",
    time: "5 hours ago",
  },
  {
    title: "European energy ministers meet over winter supply plans",
    country: "UK",
    category: "Politics",
    time: "7 hours ago",
  },
  {
    title: "Central bank signals possible rate cut later this year",
    country: "USA",
    category: "Economy",
    time: "9 hours ago",
  },
  {
    title: "Southeast Asian nations agree on new climate framework",
    country: "Indonesia",
    category: "Environment",
    time: "11 hours ago",
  },
];

export default function World() {
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
          <span className="bg-[var(--color-accent-2)] text-black text-xs font-[family-name:var(--font-mono)] font-semibold px-2 py-1 uppercase">
            World
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Around the Globe
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {worldNews.map((item, i) => (
            <article
              key={i}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 rounded-lg flex items-start justify-between gap-4 hover:border-[var(--color-accent-2)] transition-colors"
            >
              <div>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-accent-2)] uppercase">
                  {item.country} · {item.category}
                </span>

                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold mt-1">
                  {item.title}
                </h3>
              </div>

              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] whitespace-nowrap">
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
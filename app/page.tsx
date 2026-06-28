const pakistanNews = [
  {
    title: "Govt announces new digital tax policy for freelancers",
    summary: "The federal government has unveiled a new framework aimed at formalizing income from online freelance work.",
    category: "Business",
    time: "2 hours ago",
  },
  {
    title: "Heatwave alert issued across Punjab and Sindh",
    summary: "Meteorological department warns of temperatures crossing 45°C in major cities this week.",
    category: "Weather",
    time: "4 hours ago",
  },
  {
    title: "PSL franchise announces new training academy",
    summary: "A new cricket academy aimed at grassroots talent will open in three major cities.",
    category: "Sports",
    time: "6 hours ago",
  },
];

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
];

const ticker = [
  "Markets open higher amid global rally",
  "Central bank holds interest rates steady",
  "New tech policy draft released for public feedback",
  "Regional trade talks resume after brief pause",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Ticker bar */}
      <div className="bg-[var(--color-accent)] text-black overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block animate-marquee font-[family-name:var(--font-mono)] text-sm font-medium">
          {ticker.map((item, i) => (
            <span key={i} className="mx-8">
              ● {item}
            </span>
          ))}
          {ticker.map((item, i) => (
            <span key={`dup-${i}`} className="mx-8">
              ● {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)]/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
            Khabar<span className="text-[var(--color-accent)]">nama</span>
          </h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--color-text-muted)]">
            <a href="#" className="text-[var(--color-text)]">Home</a>
            <a href="#" className="hover:text-[var(--color-text)]">Pakistan</a>
            <a href="#" className="hover:text-[var(--color-text)]">World</a>
            <a href="#" className="hover:text-[var(--color-text)]">Politics</a>
            <a href="#" className="hover:text-[var(--color-text)]">Sports</a>
            <a href="#" className="hover:text-[var(--color-text)]">Business</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Pakistan Hero Section */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[var(--color-accent)] text-black text-xs font-[family-name:var(--font-mono)] font-semibold px-2 py-1 uppercase">
              Breaking
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              Pakistan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pakistanNews.map((item, i) => (
              <article
                key={i}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 hover:border-[var(--color-accent)] transition-colors"
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
        </section>

        {/* World News Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[var(--color-accent-2)] text-black text-xs font-[family-name:var(--font-mono)] font-semibold px-2 py-1 uppercase">
              World
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              Around the Globe
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {worldNews.map((item, i) => (
              <article
                key={i}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 flex items-start justify-between gap-4 hover:border-[var(--color-accent-2)] transition-colors"
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
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] mt-16 py-8">
        <div className="max-w-6xl mx-auto px-6 text-sm text-[var(--color-text-muted)] flex justify-between">
          <p>© 2026 Khabarnama. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--color-text)]">About</a>
            <a href="#" className="hover:text-[var(--color-text)]">Contact</a>
            <a href="#" className="hover:text-[var(--color-text)]">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
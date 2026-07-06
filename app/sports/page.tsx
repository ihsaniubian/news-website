import Link from "next/link";

const sportsNews = [
  {
    title: "PSL franchise announces new training academy",
    summary:
      "A new cricket academy aimed at grassroots talent will open in three major cities.",
    category: "Cricket",
    time: "6 hours ago",
  },
  {
    title: "National football team names squad for regional qualifiers",
    summary:
      "The coaching staff has included several young players from domestic leagues in the final squad.",
    category: "Football",
    time: "3 hours ago",
  },
  {
    title: "Squash federation announces revamped national ranking system",
    summary:
      "The new system aims to give emerging players clearer pathways to international events.",
    category: "Squash",
    time: "8 hours ago",
  },
  {
    title: "Hockey team secures spot in regional championship final",
    summary:
      "A strong second-half performance sealed the win in a closely contested semifinal.",
    category: "Hockey",
    time: "10 hours ago",
  },
  {
    title: "Athletics board unveils plan for new training facility",
    summary:
      "The facility is expected to support track and field athletes preparing for international competitions.",
    category: "Athletics",
    time: "12 hours ago",
  },
];

export default function Sports() {
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
            Sports
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Sports Roundup
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sportsNews.map((item, i) => (
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
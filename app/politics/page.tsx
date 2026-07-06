import Link from "next/link";

const politicsNews = [
  {
    title: "Parliament session to debate new local government bill",
    summary:
      "Lawmakers are set to discuss reforms aimed at devolving more authority to district-level administrations.",
    time: "2 hours ago",
  },
  {
    title: "Opposition parties announce joint strategy ahead of session",
    summary:
      "Coalition leaders met to finalize a unified stance on upcoming budget discussions.",
    time: "5 hours ago",
  },
  {
    title: "Election commission releases updated voter registration figures",
    summary:
      "New data shows a rise in registered voters across urban constituencies over the past year.",
    time: "7 hours ago",
  },
  {
    title: "Cabinet approves new foreign policy framework",
    summary:
      "The framework outlines priorities for regional trade and diplomatic engagement over the next five years.",
    time: "9 hours ago",
  },
  {
    title: "Senate committee reviews proposed constitutional amendment",
    summary:
      "The committee heard testimony from legal experts on the implications of the proposed changes.",
    time: "11 hours ago",
  },
];

export default function Politics() {
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
            Politics
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Political Updates
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {politicsNews.map((item, i) => (
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
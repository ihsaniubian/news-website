import Link from "next/link";

const pakistan = [
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
];

const world = [
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

      {/* Ticker */}
      <div className="bg-[var(--color-accent)] text-black overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block animate-marquee font-[family-name:var(--font-mono)] text-sm font-medium">
          {ticker.map((item, i) => (
            <span key={i} className="mx-8">
              ● {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)]/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
            Khabar
            <span className="text-[var(--color-accent)]">nama</span>
          </h1>

          <nav className="hidden md:flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/pakistan">Pakistan</Link>
            <Link href="/world">World</Link>
            <Link href="/politics">Politics</Link>
            <Link href="/sports">Sports</Link>
            <Link href="/business">Business</Link>
          </nav>
        </div>
      </header>

     <main className="max-w-6xl mx-auto px-6 py-10">
  <h1 className="text-4xl font-bold mb-8">
    Khabarnama
  </h1>

  <p className="mb-8 text-gray-400">
    Latest News from Pakistan and Around the World
  </p>
</main>
<footer className="border-t border-[var(--color-border)] mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Khabarnama. All rights reserved.</p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <Link href="/">Home</Link>
            <Link href="/pakistan">Pakistan</Link>
            <Link href="/world">World</Link>
            <Link href="/politics">Politics</Link>
            <Link href="/sports">Sports</Link>
            <Link href="/business">Business</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
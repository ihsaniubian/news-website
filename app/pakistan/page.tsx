export default function PakistanPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Pakistan News</h1>

      <div className="space-y-6">
        <div className="border p-5 rounded-lg">
          <h2 className="text-2xl font-semibold">
            Pakistan Announces New Digital Tax Policy
          </h2>
          <p className="text-gray-400 mt-2">
            Government has introduced a new tax framework for freelancers.
          </p>
        </div>

        <div className="border p-5 rounded-lg">
          <h2 className="text-2xl font-semibold">
            Heatwave Alert Across Punjab
          </h2>
          <p className="text-gray-400 mt-2">
            Temperature expected to cross 45°C this week.
          </p>
        </div>
      </div>
    </main>
  );
}
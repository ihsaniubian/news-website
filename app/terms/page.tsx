import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-3xl mx-auto bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        
        <h1 className="text-3xl font-bold border-b pb-4 text-slate-900">Terms & Conditions</h1>
        <p className="text-sm text-slate-500">Last updated: July 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">1. Use of Content</h2>
          <p className="leading-relaxed">All content provided on Khabarnama is for informational purposes only. Content cannot be redistributed or copied without proper attribution.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">2. Disclaimer</h2>
          <p className="leading-relaxed">While we strive for 100% journalistic accuracy, Khabarnama is not liable for any temporary inaccuracies in live breaking news reports.</p>
        </section>
      </div>
    </div>
  );
}
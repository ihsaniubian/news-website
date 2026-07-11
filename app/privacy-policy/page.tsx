import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-3xl mx-auto bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        
        <h1 className="text-3xl font-bold border-b pb-4 text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: July 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
          <p className="leading-relaxed">We only collect basic analytical data through cookies and server logs to monitor traffic, user engagement, and to serve advertisements via Google AdSense.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">2. Google AdSense & Cookies</h2>
          <p className="leading-relaxed">Google, as a third-party vendor, uses cookies to serve ads on Khabarnama. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to this site or other sites on the Internet.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">3. Data Protection</h2>
          <p className="leading-relaxed">We care about your privacy and do not sell or share any personal information or email addresses with third parties.</p>
        </section>
      </div>
    </div>
  );
}
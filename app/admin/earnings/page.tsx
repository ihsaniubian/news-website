"use client";
import React, { useEffect, useState } from "react";

interface EarningsData {
  totalEarnings: number;
  totalImpressions: number;
  totalClicks: number;
  ctr: string;
  dailyStats: { date: string; earnings: number; clicks: number }[];
}

export default function EarningsPage() {
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/earnings")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-slate-500">Loading Earnings Dashboard...</div>;
  }

  if (!data) {
    return <div className="p-6 text-center text-red-500">Failed to load earnings data.</div>;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">💰 Earning & AdSense Tracker</h1>
      
      {/* Top Cards Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-400 uppercase">Estimated Earnings</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">${data.totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-400 uppercase">Total Impressions</p>
          <p className="text-2xl font-bold text-slate-700 mt-2">{data.totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-400 uppercase">Total Clicks</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{data.totalClicks.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-400 uppercase">Page CTR</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{data.ctr}</p>
        </div>
      </div>

      {/* Daily Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-semibold text-slate-700">Daily Performance Breakdown</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 text-sm font-medium">
              <th className="p-4">Date</th>
              <th className="p-4">Estimated Earnings</th>
              <th className="p-4">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {data.dailyStats.map((stat, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-medium text-slate-700">{stat.date}</td>
                <td className="p-4 text-emerald-600 font-semibold">${stat.earnings.toFixed(2)}</td>
                <td className="p-4 text-blue-600">{stat.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
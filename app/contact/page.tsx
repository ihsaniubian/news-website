'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactUs() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Apka message receive ho gaya hai. Hum jald hi contact karenge.');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-xl mx-auto bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📬 Contact Us</h1>
          <p className="text-xs text-slate-500 mt-1">Any queries or advertising requests? Drop us a message.</p>
        </div>

        <form onSubmit={handleSendMessage} className="space-y-4 text-sm">
          <div>
            <label className="block font-semibold mb-1 text-slate-700">Your Email Address *</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:outline-blue-500" 
              required 
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700">Message *</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-2.5 rounded-lg h-32 resize-none focus:outline-blue-500" 
              required 
              placeholder="Write your message here..."
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 rounded-lg transition shadow-sm">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
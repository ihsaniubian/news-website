import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// 🚀 Professional SEO & Google Search Console Verification Config
export const metadata: Metadata = {
  title: 'Breaking.X.global - Latest Pakistan & World News',
  description: 'Pakistan aur dunya bhar ki taja tareen surkhiyan, business, politics, aur khel ki khabar sabse pehle padhein Breaking.X.global par.',
  keywords: ['Breaking.X.global', 'Breaking X Global', 'Pakistan News', 'World News Urdu'],
  verification: {
    // FIXME: Jab Google Search Console account banayein, to apna asli token yahan dalein
    google: 'yahan_aapka_google_console_token_aayega', 
  },
  openGraph: {
    title: 'Breaking.X.global - Latest Pakistan & World News',
    description: 'Breaking news and analysis from Pakistan and around the world.',
    url: 'https://breakingx.global', // FIXME: Jab apna .global domain purchase karein to yahan link badal lein
    siteName: 'Breaking.X.global',
    images: [
      {
        url: 'https://breakingx.global/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 💵 Google AdSense Integration (Fixed Vanilla Injection to stop terminal error) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body 
        className={`${inter.className} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        {/* Main Application Pages */}
        {children}

        {/* 📈 Google Analytics 4 (GA4) Tracking Script */}
        <GoogleAnalytics gaId="G-XYZ1234567" />
      </body>
    </html>
  );
}
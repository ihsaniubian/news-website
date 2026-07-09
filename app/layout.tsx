import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khabarnama Admin Panel",
  description: "Manage news articles dynamically",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning browser extensions (Grammarly/LanguageTool) ke clash ko khatam karta hai
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0f0f12] text-white antialiased min-h-screen`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
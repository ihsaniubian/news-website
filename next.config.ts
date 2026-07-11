import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['isomorphic-dompurify', 'jsdom'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Naya Proxy/Rewrites features jo Next.js demand kar raha hai
  async rewrites() {
    return [];
  },
};

export default nextConfig;
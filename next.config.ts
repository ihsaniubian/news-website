import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['isomorphic-dompurify', 'jsdom'],
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
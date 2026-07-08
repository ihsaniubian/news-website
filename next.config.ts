/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Ab yahan cloudinary ka domain aayega
      },
    ],
  },
};

module.exports = nextConfig;
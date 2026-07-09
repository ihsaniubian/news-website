import { MetadataRoute } from 'next';
// 💡 Note: Agar Prisma hai, to upar database import kar sakte hain:
// import { prisma } from '@/lib/prisma'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://khabarnama.com'; // Deploy karte waqt apna actual URL laga lena

  // 1. Static Pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
  ];

  // 2. Dynamic News Pages (Database Mock Example)
  // Real database call aisi hogi: const posts = await prisma.news.findMany({ select: { slug: true, updatedAt: true } });
  const mockDbPosts = [
    { slug: 'pakistan-ke-chote-karobar-ke-liye-naye-scheme', updatedAt: new Date() },
    { slug: 'karachi-metro-bus-project-nears-completion', updatedAt: new Date() }
  ];

  const newsPages = mockDbPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...staticPages, ...newsPages];
}
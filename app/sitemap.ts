import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourwebsite.com";

  // TODO: Apne database se saari news ka slug aur updated_at fetch karein
  // const newsList = await db.news.findMany({ select: { slug: true, updated_at: true } });
  const mockNewsList = [{ slug: "example-news", updated_at: new Date() }]; // Temporary dummy data

  const newsUrls = mockNewsList.map((news) => ({
    url: `${baseUrl}/news/${news.slug}`,
    lastModified: new Date(news.updated_at),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    ...newsUrls,
  ];
}
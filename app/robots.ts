import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',      // Admin panel secure rahega
        '/admin/add-news', 
        '/api',        // Backend routes scan nahi honge
      ],
    },
    sitemap: 'https://khabarnama.com/sitemap.xml', // Apni website ka actual live domain daalna baad mein
  };
}
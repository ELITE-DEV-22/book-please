import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://book-please.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://book-please.vercel.app/reviews',
      lastModified: new Date(),
    },
    {
      url: 'https://book-please.vercel.app/guides',
      lastModified: new Date(),
    },
    {
      url: 'https://book-please.vercel.app/about',
      lastModified: new Date(),
    },
  ];
}
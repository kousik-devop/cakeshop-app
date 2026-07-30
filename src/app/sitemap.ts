import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sweetdelightcakes.com';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/collection`, lastModified: new Date() },
    { url: `${baseUrl}/offers`, lastModified: new Date() },
    { url: `${baseUrl}/custom-cake`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/faq`, lastModified: new Date() },
  ];
}

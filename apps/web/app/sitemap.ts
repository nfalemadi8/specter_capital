import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://phantomtreasury.com';

  const routes = [
    '/',
    '/platform',
    '/pricing',
    '/integrations',
    '/security',
    '/about',
    '/faq',
    '/changelog',
    '/careers',
    '/press',
    '/contact',
    '/privacy',
    '/terms',
    '/compliance',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}

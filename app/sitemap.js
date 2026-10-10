import { siteConfig } from '@/lib/site';

export default function sitemap() {
  const lastModified = new Date();

  return [
    { url: siteConfig.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/#about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/#activities`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/#events`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/#team`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${siteConfig.url}/#join`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/#contact`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
  ];
}

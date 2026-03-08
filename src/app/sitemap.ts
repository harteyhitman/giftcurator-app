import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gifting.app',
      lastModified: new Date(),
    },
    {
      url: 'https://gifting.app/beneficiaries',
      lastModified: new Date(),
    },
    {
      url: 'https://gifting.app/events',
      lastModified: new Date(),
    },
    {
      url: 'https://gifting.app/reports',
      lastModified: new Date(),
    },
    {
      url: 'https://gifting.app/subscriptions',
      lastModified: new Date(),
    },
    {
      url: 'https://gifting.app/support',
      lastModified: new Date(),
    },
    {
      url: 'https://gifting.app/settings',
      lastModified: new Date(),
    },
  ];
}

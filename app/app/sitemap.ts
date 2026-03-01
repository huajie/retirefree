import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://retirefree.app'
  const currentDate = new Date()

  // Updated sitemap with all calculator pages
  return [
    // Core pages
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Calculator pages (high value)
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/401k-withdrawal`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-02-28'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/4-percent-rule-2026`,
      lastModified: new Date('2026-02-28'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/safe-withdrawal-rate-calculator`,
      lastModified: new Date('2026-02-28'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/retirement-withdrawal-mistakes`,
      lastModified: new Date('2026-02-28'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Legal
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-02-26'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-02-26'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Note: Dashboard pages are excluded (require authentication)
    // Note: Auth pages are excluded (no SEO value)
  ]
}

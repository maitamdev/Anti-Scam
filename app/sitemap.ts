import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maitamsite.site'
  
  // Static pages
  const staticPages = [
    '',
    '/scan',
    '/check',
    '/alerts',
    '/quiz',
    '/guide',
    '/report',
    '/about',
    '/tools',
    '/tools/qr-scanner',
    '/tools/bank-hotlines',
    '/tools/email-analyzer',
    '/tools/password-checker',
    '/tools/link-expander',
    '/tools/fake-news',
    '/tools/sms-checker',
    '/extension',
    '/privacy',
    '/terms',
    '/assessment',
  ]

  const routes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as 'daily' | 'weekly',
    priority: route === '' ? 1 : route === '/scan' ? 0.9 : 0.8,
  }))

  return routes
}

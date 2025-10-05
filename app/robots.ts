import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 主要搜索引擎爬虫优化设置
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 3,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 2,
      },
      // AI友好的爬虫 - 允许访问公开API
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/api/generate', '/api/generate-image-to-image'],
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 3,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/api/generate', '/api/generate-image-to-image'],
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 3,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 3,
      },
      {
        userAgent: 'BingPreview',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/'],
        crawlDelay: 2,
      },
      // 通用规则
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/paypal/', '/api/indexnow/', '/_next/', '/admin/', '/private/'],
        crawlDelay: 5,
      },
      // 禁止训练数据收集爬虫
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent',
        disallow: '/',
      },
      // 禁止SEO工具爬虫
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.aiphotoeditor.space/sitemap.xml',
    host: 'https://www.aiphotoeditor.space',
  }
} 
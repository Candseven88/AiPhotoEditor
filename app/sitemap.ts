import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aiphotoeditor.space'
  const locales = ['en', 'ja']
  const currentDate = new Date()
  
  // 主要页面 - 按重要性排序
  const mainPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/aiphotoeditor', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/seedream', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/payment/success', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/payment/cancel', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const },
  ]
  
  // 博客文章
  const blogPosts = [
    '/blog/seedream-4-release',
    '/blog/feature-exploration',
    '/blog/model-comparison',
    '/blog/comfyui-integration',
    '/blog/multilingual-support',
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // 为每个语言版本添加主要页面
  locales.forEach(locale => {
    mainPages.forEach(pageInfo => {
      const url = locale === 'en' ? `${baseUrl}${pageInfo.path}` : `${baseUrl}/${locale}${pageInfo.path}`
      sitemap.push({
        url: url,
        lastModified: currentDate,
        changeFrequency: pageInfo.changeFreq,
        priority: pageInfo.priority,
        alternates: {
          languages: {
            en: `${baseUrl}${pageInfo.path}`,
            ja: `${baseUrl}/ja${pageInfo.path}`,
          }
        }
      })
    })
    
    // 添加博客文章
    blogPosts.forEach(post => {
      const url = locale === 'en' ? `${baseUrl}${post}` : `${baseUrl}/${locale}${post}`
      sitemap.push({
        url: url,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}${post}`,
            ja: `${baseUrl}/ja${post}`,
          }
        }
      })
    })
  })
  
  return sitemap
} 
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aiphotoeditor.space'
  const currentDate = new Date()
  
  // 主要页面 - 按重要性排序，移除多语言支持
  const mainPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/aiphotoeditor', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/vheer', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/seedream', priority: 0.9, changeFreq: 'weekly' as const },
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // 添加主要页面
  mainPages.forEach(pageInfo => {
    sitemap.push({
      url: `${baseUrl}${pageInfo.path}`,
      lastModified: currentDate,
      changeFrequency: pageInfo.changeFreq,
      priority: pageInfo.priority,
    })
  })
  
  // 添加API端点（对于AI工具很重要）
  const apiEndpoints = [
    { path: '/api/generate', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/api/generate-image-to-image', priority: 0.8, changeFreq: 'weekly' as const },
  ]
  
  apiEndpoints.forEach(endpoint => {
    sitemap.push({
      url: `${baseUrl}${endpoint.path}`,
      lastModified: currentDate,
      changeFrequency: endpoint.changeFreq,
      priority: endpoint.priority,
    })
  })
  
  return sitemap
} 
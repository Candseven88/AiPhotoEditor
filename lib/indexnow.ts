/**
 * IndexNow 工具函数
 * 用于快速通知搜索引擎内容更新
 */

export interface IndexNowResult {
  engine: string
  status?: number
  success: boolean
  error?: string
}

export interface IndexNowResponse {
  message: string
  results: IndexNowResult[]
  submittedUrls: string[]
}

/**
 * 提交单个URL到IndexNow
 */
export async function submitToIndexNow(url: string): Promise<IndexNowResponse> {
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to submit to IndexNow:', error)
    throw error
  }
}

/**
 * 提交多个URL到IndexNow
 */
export async function submitMultipleToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to submit multiple URLs to IndexNow:', error)
    throw error
  }
}

/**
 * 获取网站的所有重要页面URL
 */
export function getImportantUrls(): string[] {
  const baseUrl = 'https://www.aiphotoeditor.space'
  const locales = ['en', 'ja']
  
  const mainPages = [
    '',
    '/aiphotoeditor',
    '/seedream',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
  ]
  
  const blogPosts = [
    '/blog/seedream-4-release',
    '/blog/feature-exploration',
    '/blog/model-comparison',
    '/blog/comfyui-integration',
    '/blog/multilingual-support',
  ]

  const urls: string[] = []

  // 添加所有语言版本的主要页面
  locales.forEach(locale => {
    mainPages.forEach(page => {
      const url = locale === 'en' ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`
      urls.push(url)
    })
    
    blogPosts.forEach(post => {
      const url = locale === 'en' ? `${baseUrl}${post}` : `${baseUrl}/${locale}${post}`
      urls.push(url)
    })
  })

  return urls
}

/**
 * 提交所有重要页面到IndexNow
 */
export async function submitAllPagesToIndexNow(): Promise<IndexNowResponse> {
  const urls = getImportantUrls()
  return await submitMultipleToIndexNow(urls)
}

/**
 * 自动提交新内容到IndexNow (用于内容发布后调用)
 */
export async function autoSubmitNewContent(newUrls: string[]): Promise<void> {
  try {
    await submitMultipleToIndexNow(newUrls)
    console.log('Successfully submitted new content to IndexNow:', newUrls)
  } catch (error) {
    console.error('Failed to auto-submit new content:', error)
    // 不抛出错误，避免影响主要功能
  }
} 
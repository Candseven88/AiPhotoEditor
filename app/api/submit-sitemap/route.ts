import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const sitemapUrl = 'https://www.aiphotoeditor.space/sitemap.xml'
    const results = []

    // Google Search Console API (需要在Google Search Console验证网站)
    try {
      const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const googleResponse = await fetch(googleUrl, { method: 'GET' })
      results.push({
        engine: 'Google',
        url: googleUrl,
        status: googleResponse.status,
        success: googleResponse.ok,
      })
    } catch (error) {
      results.push({
        engine: 'Google',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      })
    }

    // Bing Webmaster Tools
    try {
      const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const bingResponse = await fetch(bingUrl, { method: 'GET' })
      results.push({
        engine: 'Bing',
        url: bingUrl,
        status: bingResponse.status,
        success: bingResponse.ok,
      })
    } catch (error) {
      results.push({
        engine: 'Bing',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      })
    }

    // Yahoo (通过Bing)
    try {
      const yahooUrl = `https://search.yahooapis.com/SiteExplorerService/V1/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const yahooResponse = await fetch(yahooUrl, { method: 'GET' })
      results.push({
        engine: 'Yahoo',
        url: yahooUrl,
        status: yahooResponse.status,
        success: yahooResponse.ok,
      })
    } catch (error) {
      results.push({
        engine: 'Yahoo',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      })
    }

    // 百度 (需要验证网站所有权)
    try {
      const baiduUrl = `https://data.zz.baidu.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const baiduResponse = await fetch(baiduUrl, { method: 'GET' })
      results.push({
        engine: 'Baidu',
        url: baiduUrl,
        status: baiduResponse.status,
        success: baiduResponse.ok,
      })
    } catch (error) {
      results.push({
        engine: 'Baidu',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      })
    }

    // Yandex
    try {
      const yandexUrl = `https://webmaster.yandex.com/site/map.xml?host=www.aiphotoeditor.space`
      results.push({
        engine: 'Yandex',
        url: yandexUrl,
        note: 'Manual submission required at Yandex Webmaster',
        success: false,
      })
    } catch (error) {
      results.push({
        engine: 'Yandex',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      })
    }

    return NextResponse.json({
      message: 'Sitemap submission completed',
      sitemapUrl,
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Sitemap submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit sitemap' },
      { status: 500 }
    )
  }
}

// GET 方法返回手动提交指南
export async function GET() {
  const sitemapUrl = 'https://www.aiphotoeditor.space/sitemap.xml'
  
  return NextResponse.json({
    message: 'Sitemap submission guide',
    sitemapUrl,
    manualSubmissionUrls: {
      'Google Search Console': 'https://search.google.com/search-console',
      'Bing Webmaster Tools': 'https://www.bing.com/webmasters',
      'Yandex Webmaster': 'https://webmaster.yandex.com/',
      'Baidu Ziyuan': 'https://ziyuan.baidu.com/',
      'DuckDuckGo': 'https://duckduckgo.com/duckduckbot',
    },
    automatedPings: {
      google: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      baidu: `https://data.zz.baidu.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    },
    instructions: {
      en: 'Submit your sitemap to search engines to improve crawling and indexing',
      ja: 'サイトマップを検索エンジンに送信してクロールとインデックス化を改善する',
    }
  })
} 
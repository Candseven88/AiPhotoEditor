import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_KEY = 'f47ac10b58cc4372a5670e02b2c3d479'
const BASE_URL = 'https://www.aiphotoeditor.space'

export async function POST(request: NextRequest) {
  try {
    const { url, urls } = await request.json()
    
    // 支持单个URL或多个URL
    const urlList = urls || [url]
    
    if (!urlList || urlList.length === 0) {
      return NextResponse.json({ error: 'No URLs provided' }, { status: 400 })
    }

    // IndexNow 支持的搜索引擎
    const searchEngines = [
      'https://api.indexnow.org/indexnow',  // Bing
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',        // Yandex
    ]

    const results = []

    for (const engine of searchEngines) {
      try {
        const response = await fetch(engine, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            host: 'www.aiphotoeditor.space',
            key: INDEXNOW_KEY,
            keyLocation: `${BASE_URL}/indexnow-key.txt`,
            urlList: urlList,
          }),
        })

        results.push({
          engine: engine,
          status: response.status,
          success: response.ok,
        })
      } catch (error) {
        results.push({
          engine: engine,
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false,
        })
      }
    }

    return NextResponse.json({
      message: 'IndexNow notifications sent',
      results,
      submittedUrls: urlList,
    })
  } catch (error) {
    console.error('IndexNow API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow' },
      { status: 500 }
    )
  }
}

// GET 方法 - 自动提交主要页面
export async function GET() {
  const mainUrls = [
    `${BASE_URL}`,
    `${BASE_URL}/aiphotoeditor`,
    `${BASE_URL}/vheer`,
    `${BASE_URL}/seedream`,
  ]

  try {
    const searchEngines = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ]

    const results = []

    for (const engine of searchEngines) {
      try {
        const response = await fetch(engine, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            host: 'www.aiphotoeditor.space',
            key: INDEXNOW_KEY,
            keyLocation: `${BASE_URL}/indexnow-key.txt`,
            urlList: mainUrls,
          }),
        })

        results.push({
          engine: engine,
          status: response.status,
          success: response.ok,
        })
      } catch (error) {
        results.push({
          engine: engine,
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false,
        })
      }
    }

    return NextResponse.json({
      message: 'IndexNow notifications sent for main pages',
      keyLocation: `${BASE_URL}/indexnow-key.txt`,
      supportedEngines: ['Bing', 'Yandex', 'IndexNow API'],
      results,
      submittedUrls: mainUrls,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow' },
      { status: 500 }
    )
  }
} 
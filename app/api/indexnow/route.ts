import { NextRequest, NextResponse } from 'next/server'

// IndexNow API Key - 生产环境应该放在环境变量中
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

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
      // 可以添加其他支持IndexNow的搜索引擎
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
            keyLocation: `https://www.aiphotoeditor.space/${INDEXNOW_KEY}.txt`,
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

// GET 方法用于验证API状态
export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API is running',
    keyLocation: `https://www.aiphotoeditor.space/${INDEXNOW_KEY}.txt`,
    supportedEngines: ['Bing', 'IndexNow API'],
  })
} 
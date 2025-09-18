import { NextRequest, NextResponse } from 'next/server'

// 简单的内存缓存
const cache = new Map<string, { data: ArrayBuffer; contentType: string; timestamp: number }>()
const CACHE_DURATION = 30 * 60 * 1000 // 30分钟缓存

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  try {
    // 检查缓存
    const cacheKey = targetUrl
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Serving from cache:', targetUrl)
      return new NextResponse(cached.data, {
        headers: {
          'Content-Type': cached.contentType,
          'Cache-Control': 'public, max-age=1800, s-maxage=1800', // 30分钟浏览器缓存
          'CDN-Cache-Control': 'public, max-age=86400', // 24小时CDN缓存
        },
      })
    }

    console.log('Fetching from upstream:', targetUrl)
    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AI-Photo-Editor/1.0)',
        'Accept': 'image/*',
      },
      // 添加超时
      signal: AbortSignal.timeout(10000), // 10秒超时
    })

    if (!upstream.ok) {
      throw new Error(`Upstream responded with ${upstream.status}`)
    }

    const arrayBuffer = await upstream.arrayBuffer()
    const contentType = upstream.headers.get('content-type') || 'image/png'
    
    // 存储到缓存
    cache.set(cacheKey, {
      data: arrayBuffer,
      contentType,
      timestamp: Date.now()
    })
    
    // 清理过期缓存
    const entries = Array.from(cache.entries())
    for (const [key, value] of entries) {
      if (Date.now() - value.timestamp > CACHE_DURATION) {
        cache.delete(key)
      }
    }

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
        'CDN-Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return new NextResponse('Failed to fetch image', { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })
  }
} 
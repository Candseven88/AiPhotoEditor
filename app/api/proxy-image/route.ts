import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing url parameter' }), { status: 400 })
    }

    // 安全校验：仅允许 http/https
    const parsed = new URL(targetUrl)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return new Response(JSON.stringify({ error: 'Invalid protocol' }), { status: 400 })
    }

    // 代理获取远程图片
    const upstream = await fetch(targetUrl, { cache: 'no-store' })
    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: 'Upstream fetch failed', status: upstream.status }),
        { status: upstream.status }
      )
    }

    // 透传内容类型
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream'

    // 生成一个文件名
    const fileName = parsed.pathname.split('/').pop() || `image-${Date.now()}.png`

    // 返回同源响应，附带下载头部
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`)
    headers.set('Cache-Control', 'no-store')

    return new Response(upstream.body, { status: 200, headers })
  } catch (error) {
    console.error('proxy-image error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
} 
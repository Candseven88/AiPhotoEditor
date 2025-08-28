import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')
    
    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing url parameter' }), { status: 400 })
    }

    const parsed = new URL(targetUrl)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return new Response(JSON.stringify({ error: 'Invalid protocol' }), { status: 400 })
    }

    console.log('Fetching image from:', targetUrl)
    
    const upstream = await fetch(targetUrl, { 
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    console.log('Upstream response status:', upstream.status)
    
    if (!upstream.ok) {
      console.error('Upstream fetch failed:', upstream.status, upstream.statusText)
      return new Response(
        JSON.stringify({ error: 'Upstream fetch failed', status: upstream.status, statusText: upstream.statusText }),
        { status: upstream.status }
      )
    }

    const contentType = upstream.headers.get('content-type') || 'image/png'
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Cache-Control', 'public, max-age=3600')
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return new Response(upstream.body, { status: 200, headers })
  } catch (error) {
    console.error('proxy-image-display error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
} 
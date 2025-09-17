import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ja']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查路径是否已经包含支持的语言
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 如果路径已经包含语言前缀，直接放行
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // 如果是根路径，让客户端处理重定向
  if (pathname === '/') {
    return NextResponse.next()
  }

  // 对于其他没有语言前缀的路径，重定向到英语版本
  if (!pathnameHasLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以下：
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|Logo.png|cases).*)',
  ],
} 
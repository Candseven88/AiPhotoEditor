import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ja']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查路径是否已经包含支持的语言
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 如果路径是 /en 开头，重定向到不带前缀的路径
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace('/en', '') || '/'
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // 如果路径不包含语言前缀，添加默认语言到内部重写
  if (!pathnameHasLocale) {
    // 获取用户的首选语言
    const acceptLanguage = request.headers.get('accept-language') || ''
    
    // 检查是否包含日语
    if (acceptLanguage.includes('ja-') || acceptLanguage.includes('ja,')) {
      // 如果用户首选日语且路径不是根路径，重定向到日语版本
      if (pathname !== '/') {
        return NextResponse.redirect(new URL(`/ja${pathname}`, request.url))
      }
      // 如果是根路径，重定向到日语首页
      return NextResponse.redirect(new URL('/ja', request.url))
    }
    
    // 对于英语用户或默认情况，重写到 /en 路径（内部重写，用户看不到）
    return NextResponse.rewrite(new URL(`/en${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以下：
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|Logo.png|cases).*)',
  ],
} 
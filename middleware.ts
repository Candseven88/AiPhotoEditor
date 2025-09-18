import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ja']
const defaultLocale = 'en'

// 获取首选语言
function getPreferredLocale(request: NextRequest) {
  // 从Accept-Language头获取首选语言
  const acceptLanguage = request.headers.get('accept-language')
  
  if (acceptLanguage) {
    // 检查是否包含日语
    if (acceptLanguage.includes('ja')) {
      return 'ja'
    }
  }
  
  return defaultLocale
}

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

  // 如果是根路径，服务器端重定向到合适的语言版本
  if (pathname === '/') {
    const preferredLocale = getPreferredLocale(request)
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url))
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
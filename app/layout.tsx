import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// 优化字体加载
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 使用 font-display: swap 优化字体加载
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  variable: '--font-inter', // 添加CSS变量
})

// 生成多语言metadata
export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'
  
  const metadata = {
    en: {
      title: 'Free AI Photo Editor - Best AI Image Editor & Photo Editing Tool Online',
      description: 'Transform photos with our free AI photo editor. Professional AI image editing, photo fixer, and picture editor. Create, edit, and enhance images with advanced AI technology. Try the best AI photoshop alternative now!',
      keywords: 'AI photo editor, free AI image editor, AI picture editor, photo editing AI, AI photo fixer, AI image fixer, AI image modifier, best AI image editor, AI edit image, AI photoshop editor',
    },
    ja: {
      title: 'AI フォトエディター - 無料のAI画像編集ツール',
      description: 'AI フォトエディターで写真を変換。無料のAI画像編集、写真修正、画像加工ツール。高度なAI技術で画像を作成、編集、強化。最高のAI画像エディターを今すぐお試しください。',
      keywords: 'AI フォトエディター, 無料AI画像編集, AI写真編集, AI画像修正, AI画像加工, 最高のAI画像エディター',
    }
  }

  const currentMeta = metadata[locale as keyof typeof metadata] || metadata.en

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    icons: {
      icon: '/Logo.png',
      shortcut: '/Logo.png',
      apple: '/Logo.png',
    },
    verification: {
      google: 'PnF_JUbsBtHyPbnWvat0KgdAXjCaj9TdlBIXBWUmnJQ',
    },
    metadataBase: new URL('https://www.aiphotoeditor.space'),
    alternates: {
      canonical: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}`,
    },
    // 添加Open Graph和Twitter Card标签
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}`,
      siteName: 'AI Photo Editor - Free AI Image Editor',
      images: [
        {
          url: '/Logo.png',
          width: 1200,
          height: 630,
          alt: 'Free AI Photo Editor - Best AI Image Editing Tool',
        }
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
      images: ['/Logo.png'],
      creator: '@aiphotoeditor',
      site: '@aiphotoeditor',
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: Promise<{ locale?: string }>
}) {
  const resolvedParams = params ? await params : {}
  const locale = resolvedParams?.locale || 'en'
  
  // 结构化数据JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Photo Editor - Free AI Image Editor",
    "alternateName": ["Free AI Photo Editor", "AI Image Editor", "AI Picture Editor"],
    "url": "https://www.aiphotoeditor.space",
    "description": locale === 'ja' ? 
      "AI フォトエディターで写真を変換。無料のAI画像編集、写真修正、画像加工ツール。高度なAI技術で画像を作成、編集、強化。" :
      "Transform photos with our free AI photo editor. Professional AI image editing, photo fixer, and picture editor. Create, edit, and enhance images with advanced AI technology.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free AI photo editing with premium features available"
    },
    "creator": {
      "@type": "Organization",
      "name": "AI Photo Editor"
    },
    "featureList": [
      "Free AI Photo Editor",
      "AI Image Fixer and Photo Repair",
      "AI Picture Editor with Style Transfer",
      "AI Image Modifier and Enhancement",
      "Text to Image AI Generation",
      "Username to Avatar Creation",
      "AI Background Editor and Removal",
      "Professional Photo Editing AI",
      "Best AI Image Editor Tools",
      "AI Photoshop Alternative"
    ],
    "keywords": [
      "ai photo editor",
      "free ai image editor", 
      "ai picture editor",
      "photo editing ai",
      "ai photo fixer",
      "ai image fixer",
      "ai image modifier",
      "best ai image editor",
      "ai edit image",
      "ai photoshop editor"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "50000",
      "bestRating": "5"
    },
    "screenshot": "/Logo.png",
    "softwareVersion": "4.0",
    "datePublished": "2023-01-01",
    "dateModified": "2024-01-01"
  }
  
  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {/* 预连接到重要的外部域名 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://open.bigmodel.cn" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/Logo.png" as="image" type="image/png" />
        
        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* 优化Google Analytics加载 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTQMD39NCB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LTQMD39NCB', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>
        
        {/* 延迟加载Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tb0ukafpv1");
          `}
        </Script>
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 
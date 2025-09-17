import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

// 生成多语言metadata
export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params?.locale || 'en'
  
  const metadata = {
    en: {
      title: 'AI Photo Editor - Advanced AI Image Generation Platform',
      description: 'Transform ideas into stunning visuals with AI Photo Editor. Generate personalized avatars from usernames, create images from text, enhance photos with AI technology.',
      keywords: 'AI, image generation, artificial intelligence, avatar, text to image, image to image, AI Photo Editor',
    },
    ja: {
      title: 'AI フォトエディター - 高度なAI画像生成プラットフォーム',
      description: 'AI フォトエディターでアイデアを美しいビジュアルに変換。ユーザー名からアバター生成、テキストから画像作成、AI技術で写真を強化。',
      keywords: 'AI, 画像生成, 人工知能, アバター, テキストから画像, 画像から画像, AI フォトエディター',
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
      siteName: 'AI Photo Editor',
      images: [
        {
          url: '/Logo.png',
          width: 1200,
          height: 630,
          alt: 'AI Photo Editor - Advanced AI Image Generation',
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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { locale?: string }
}) {
  const locale = params?.locale || 'en'
  
  // 结构化数据JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Photo Editor",
    "url": "https://www.aiphotoeditor.space",
    "description": locale === 'ja' ? 
      "AI フォトエディターでアイデアを美しいビジュアルに変換。ユーザー名からアバター生成、テキストから画像作成、AI技術で写真を強化。" :
      "Transform ideas into stunning visuals with AI Photo Editor. Generate personalized avatars from usernames, create images from text, enhance photos with AI technology.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "AI Photo Editor"
    },
    "featureList": [
      "Username to Avatar Generation",
      "Text to Image Generation",
      "Image to Image Transformation",
      "AI-Powered Photo Enhancement"
    ]
  }
  
  return (
    <html lang={locale}>
      <head>
        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTQMD39NCB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LTQMD39NCB');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tb0ukafpv1");
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 
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
      title: 'AI Photo Editor - Advanced AI Image Generation',
      description: 'Transform your ideas into stunning visuals with our advanced AI image generation platform. Create personalized avatars, generate images from text, and transform photos with cutting-edge AI technology.',
      keywords: 'AI, image generation, artificial intelligence, avatar, text to image, image to image, AI Photo Editor',
    },
    ja: {
      title: 'AI フォトエディター - 高度なAI画像生成',
      description: '最先端のAI画像生成プラットフォームでアイデアを美しいビジュアルに変換します。パーソナライズされたアバターの作成、テキストからの画像生成、最新のAI技術による写真変換を実現。',
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
  
  return (
    <html lang={locale}>
      <head>
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
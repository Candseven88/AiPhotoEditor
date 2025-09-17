import type { Metadata } from 'next'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const metadata = {
    en: {
      title: 'Seedream 4.0 - Professional AI Image Generation | AI Photo Editor',
      description: 'Experience the future of AI image generation with Seedream 4.0. Create 4K high-resolution images, professional photo editing, and advanced AI-powered visual content creation. Built for creative professionals.',
    },
    ja: {
      title: 'Seedream 4.0 - プロフェッショナルAI画像生成 | AI フォトエディター',
      description: 'Seedream 4.0でAI画像生成の未来を体験。4K高解像度画像作成、プロフェッショナル写真編集、高度なAI支援ビジュアルコンテンツ作成。クリエイティブプロフェッショナル向けに構築。',
    }
  }

  const currentMeta = metadata[locale as keyof typeof metadata] || metadata.en

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}/seedream`,
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}/seedream`,
      siteName: 'AI Photo Editor',
      images: [
        {
          url: '/Logo.png',
          width: 1200,
          height: 630,
          alt: 'Seedream 4.0 - Professional AI Image Generation',
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
    },
  }
}

export default function SeedreamLayout({ children }: LayoutProps) {
  return <>{children}</>
} 
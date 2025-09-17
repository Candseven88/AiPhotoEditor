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
      title: 'AI Image Generation Blog - Tips, Tutorials & Latest Trends | AI Photo Editor',
      description: 'Discover the latest AI image generation techniques, professional editing tips, and comprehensive tutorials. Learn about Seedream, ComfyUI integration, and cutting-edge AI photo editing technology.',
    },
    ja: {
      title: 'AI画像生成ブログ - ヒント、チュートリアル＆最新トレンド | AI フォトエディター',
      description: '最新のAI画像生成技術、プロフェッショナル編集のヒント、包括的なチュートリアルを発見。Seedream、ComfyUI統合、最先端のAI写真編集技術について学習。',
    }
  }

  const currentMeta = metadata[locale as keyof typeof metadata] || metadata.en

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}/blog`,
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}/blog`,
      siteName: 'AI Photo Editor',
      images: [
        {
          url: '/Logo.png',
          width: 1200,
          height: 630,
          alt: 'AI Image Generation Blog - Tips & Tutorials',
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

export default function BlogLayout({ children }: LayoutProps) {
  return <>{children}</>
} 
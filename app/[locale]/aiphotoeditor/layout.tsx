import type { Metadata } from 'next'

interface LayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en'
  
  const metadata = {
    en: {
      title: 'AI Photo Editor - Username & Text to Image Generator',
      description: 'Create stunning personalized avatars from usernames and generate images from text with our advanced AI photo editor. Professional AI image generation tools for creative professionals and enthusiasts.',
    },
    ja: {
      title: 'AI フォトエディター - ユーザー名＆テキストから画像生成',
      description: 'ユーザー名から美しいパーソナライズアバターを作成し、テキストから画像を生成する高度なAIフォトエディター。クリエイティブプロフェッショナルと愛好家のための専門的なAI画像生成ツール。',
    }
  }

  const currentMeta = metadata[locale as keyof typeof metadata] || metadata.en

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}/aiphotoeditor`,
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `https://www.aiphotoeditor.space${locale === 'en' ? '' : '/' + locale}/aiphotoeditor`,
      siteName: 'AI Photo Editor',
      images: [
        {
          url: '/Logo.png',
          width: 1200,
          height: 630,
          alt: 'AI Photo Editor - Username & Text to Image Generator',
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

export default function AIPhotoEditorLayout({ children }: LayoutProps) {
  return <>{children}</>
} 
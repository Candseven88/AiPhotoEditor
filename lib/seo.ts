/**
 * SEO优化配置和工具函数
 */

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image: string
    type: string
  }
  twitter?: {
    title: string
    description: string
    image: string
  }
  structuredData?: any
}

/**
 * 基础SEO配置
 */
export const baseSEOConfig = {
  siteName: 'AI Photo Editor',
  siteUrl: 'https://www.aiphotoeditor.space',
  defaultImage: '/Logo.png',
  twitterHandle: '@aiphotoeditor',
  author: 'AI Photo Editor Team',
  themeColor: '#f97316', // 橙色主题
}

/**
 * 页面特定的SEO配置
 */
export const pageConfigs: Record<string, Record<string, SEOConfig>> = {
  home: {
    en: {
      title: 'AI Photo Editor - Advanced AI Image Generation Platform',
      description: 'Transform ideas into stunning visuals with AI Photo Editor. Generate personalized avatars from usernames, create images from text, enhance photos with AI technology. Free AI image generator.',
      keywords: ['AI image generator', 'text to image', 'avatar generator', 'AI photo editor', 'artificial intelligence', 'image creation', 'username to avatar', 'free AI tools'],
    },
    ja: {
      title: 'AI フォトエディター - 高度なAI画像生成プラットフォーム',
      description: 'AI フォトエディターでアイデアを美しいビジュアルに変換。ユーザー名からアバター生成、テキストから画像作成、AI技術で写真を強化。無料AI画像ジェネレーター。',
      keywords: ['AI画像生成', 'テキストから画像', 'アバター生成', 'AIフォトエディター', '人工知能', '画像作成', 'ユーザー名からアバター', '無料AIツール'],
    }
  },
  aiphotoeditor: {
    en: {
      title: 'AI Photo Editor - Professional Image Generation Tools',
      description: 'Professional AI-powered image generation and editing tools. Create stunning visuals, generate avatars, and transform images with cutting-edge AI technology.',
      keywords: ['professional AI tools', 'image editing', 'AI transformation', 'avatar creation', 'visual content creation'],
    },
    ja: {
      title: 'AI フォトエディター - プロフェッショナル画像生成ツール',
      description: 'プロフェッショナルなAIパワード画像生成・編集ツール。最先端のAI技術で美しいビジュアル、アバター生成、画像変換を実現。',
      keywords: ['プロAIツール', '画像編集', 'AI変換', 'アバター作成', 'ビジュアルコンテンツ作成'],
    }
  },
  seedream: {
    en: {
      title: 'Seedream 4.0 - Next Generation AI Image Generator',
      description: 'Experience Seedream 4.0, the most advanced AI image generation model. Create 4K high-resolution images, professional artwork, and stunning visuals with unprecedented quality.',
      keywords: ['Seedream 4.0', 'advanced AI', '4K images', 'high resolution', 'professional artwork', 'AI model'],
    },
    ja: {
      title: 'Seedream 4.0 - 次世代AI画像ジェネレーター',
      description: 'Seedream 4.0の体験 - 最先端のAI画像生成モデル。4K高解像度画像、プロフェッショナルアートワーク、驚異的な品質のビジュアルを作成。',
      keywords: ['Seedream 4.0', '先進AI', '4K画像', '高解像度', 'プロアートワーク', 'AIモデル'],
    }
  },
  blog: {
    en: {
      title: 'AI Image Generation Blog - Tutorials & Insights',
      description: 'Discover the latest in AI image generation technology. Read tutorials, model comparisons, integration guides, and expert insights on Seedream and other AI models.',
      keywords: ['AI tutorials', 'image generation guide', 'AI model comparison', 'Seedream tutorials', 'ComfyUI integration'],
    },
    ja: {
      title: 'AI画像生成ブログ - チュートリアル & インサイト',
      description: 'AI画像生成技術の最新情報を発見。チュートリアル、モデル比較、統合ガイド、Seedreamやその他のAIモデルの専門的洞察を読む。',
      keywords: ['AIチュートリアル', '画像生成ガイド', 'AIモデル比較', 'Seedreamチュートリアル', 'ComfyUI統合'],
    }
  }
}

/**
 * 生成结构化数据
 */
export function generateStructuredData(page: string, locale: string = 'en'): any {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": baseSEOConfig.siteName,
    "url": baseSEOConfig.siteUrl,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": baseSEOConfig.siteName
    }
  }

  switch (page) {
    case 'home':
      return {
        ...baseData,
        "description": pageConfigs.home[locale]?.description,
        "featureList": [
          "Username to Avatar Generation",
          "Text to Image Generation", 
          "Image to Image Transformation",
          "AI-Powered Photo Enhancement"
        ]
      }
    
    case 'blog':
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": `${baseSEOConfig.siteName} Blog`,
        "description": pageConfigs.blog[locale]?.description,
        "url": `${baseSEOConfig.siteUrl}/blog`,
        "author": {
          "@type": "Organization",
          "name": baseSEOConfig.siteName
        },
        "publisher": {
          "@type": "Organization", 
          "name": baseSEOConfig.siteName
        }
      }
    
    default:
      return baseData
  }
}

/**
 * 生成页面元数据
 */
export function generatePageMetadata(page: string, locale: string = 'en', customConfig?: Partial<SEOConfig>) {
  const config = pageConfigs[page]?.[locale] || pageConfigs.home[locale]
  const canonical = `${baseSEOConfig.siteUrl}${locale === 'en' ? '' : '/' + locale}${page === 'home' ? '' : '/' + page}`
  
  return {
    title: customConfig?.title || config.title,
    description: customConfig?.description || config.description,
    keywords: customConfig?.keywords?.join(', ') || config.keywords.join(', '),
    canonical,
    openGraph: {
      title: customConfig?.openGraph?.title || config.title,
      description: customConfig?.openGraph?.description || config.description,
      image: customConfig?.openGraph?.image || baseSEOConfig.defaultImage,
      url: canonical,
      siteName: baseSEOConfig.siteName,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: customConfig?.twitter?.title || config.title,
      description: customConfig?.twitter?.description || config.description,
      image: customConfig?.twitter?.image || baseSEOConfig.defaultImage,
      creator: baseSEOConfig.twitterHandle,
      site: baseSEOConfig.twitterHandle,
    },
    structuredData: customConfig?.structuredData || generateStructuredData(page, locale),
  }
}

/**
 * 生成hreflang标签
 */
export function generateHreflangTags(currentPath: string): Array<{rel: string, hreflang: string, href: string}> {
  const locales = ['en', 'ja']
  const tags: Array<{rel: string, hreflang: string, href: string}> = []
  
  locales.forEach(locale => {
    const href = locale === 'en' 
      ? `${baseSEOConfig.siteUrl}${currentPath}`
      : `${baseSEOConfig.siteUrl}/${locale}${currentPath}`
    
    tags.push({
      rel: 'alternate',
      hreflang: locale === 'en' ? 'en-US' : 'ja-JP',
      href
    })
  })
  
  // x-default标签指向英文版本
  tags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseSEOConfig.siteUrl}${currentPath}`
  })
  
  return tags
} 
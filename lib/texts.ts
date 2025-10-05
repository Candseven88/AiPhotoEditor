// 简化的英文文本常量
export const texts = {
  navigation: {
    home: "Home",
    about: "About", 
    blog: "Blog",
    blogDesc: "AI tutorials, tips, and creative inspiration",
    aboutDesc: "Learn about our AI photo editing mission",
    privacyDesc: "How we protect your privacy and data",
    termsDesc: "Terms of service and usage guidelines",
    feedbackDesc: "Share your thoughts and suggestions",
    vheerDesc: "Creative AI image generator and style transfer",
    aiPhotoEditor: "AI Photo Editor",
    seedream: "Seedream 4.0",
    vheer: "Vheer AI",
    aiTools: "AI Tools",
    aiToolsDesc: "Professional AI image generation and editing tools",
    more: "More",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    feedback: "Feedback"
  },
  hero: {
    title: "AI Photo Editor",
    subtitle: "Free AI Image Editor - Transform Your Ideas into Stunning Visuals",
    description: "Experience the best AI image editor with advanced photo editing AI technology. Create personalized avatars, generate images from text, and fix photos with our free AI photo editor.",
    getStartedNow: "Start Free AI Editing",
    learnAIEditingTips: "Learn AI Editing Tips",
    creativeBananaAssistant: "Your Creative Banana Assistant",
    funAccessible: "Fun, Fast & Accessible AI Editing",
    chooseCreativePath: "Choose Your Creative Path",
    choosePathDescription: "Whether you're a beginner or pro, we have the perfect AI tools for your creative journey.",
    trySeadreamPro: "Try Seedream Pro",
    readSuccessStories: "Read Success Stories"
  },
  stats: {
    imagesGenerated: "Images Generated",
    happyUsers: "Happy Users", 
    successRate: "Success Rate",
    responseTime: "Response Time"
  },
  features: {
    lightningFast: "Lightning Fast AI Processing",
    lightningFastDesc: "Generate and edit high-quality images in 5-10 seconds with our AI image editor",
    premiumQuality: "Professional Photo Quality", 
    premiumQualityDesc: "Powered by advanced AI models for stunning photo editing results",
    userFriendly: "Easy AI Photo Editing",
    userFriendlyDesc: "Simple interface designed for effortless AI image editing",
    alwaysAvailable: "24/7 AI Photo Editor",
    alwaysAvailableDesc: "Always available free AI photo editor with no waiting queues"
  },
  tabs: {
    usernameToImage: "AI Avatar Creator",
    usernameToImageDesc: "Generate personalized avatars from usernames using AI",
    textToImage: "AI Image Generator", 
    textToImageDesc: "Create stunning images from text descriptions with AI",
    imageToImage: "AI Photo Enhancer",
    imageToImageDesc: "Transform and fix existing photos with AI image editing"
  },
  benefits: {
    whyChoose: "Why Choose Our AI Photo Editor?",
    whyChooseDesc: "Experience the next generation of AI-powered photo editing with our free, comprehensive image editing platform.",
    creativeFreedom: "Unlimited Creative Freedom",
    creativeFreedomDesc: "Edit images, fix photos, and modify pictures with unlimited AI possibilities",
    securePrivate: "Secure & Private",
    securePrivateDesc: "Your photos are protected with enterprise-grade security in our AI image editor",
    professionalResults: "Professional AI Editing Results",
    professionalResultsDesc: "Industry-leading AI technology delivers the best image editing outcomes"
  },
  showcase: {
    realResults: "Real AI Photo Editing Results",
    realResultsDesc: "See how creators worldwide use our AI image editor to transform their photos and boost engagement with professional editing results.",
    masterProfessionalEditing: "Master Professional AI Photo Editing",
    seeTheMagic: "See AI Photo Editing Magic",
    seeTheMagicDesc: "Witness the incredible transformation power of our AI image editor through real photo editing examples.",
    original: "Original Photo",
    aiEnhanced: "AI Edited",
    styleTransformation: "AI Style Enhancement",
    styleTransformationDesc: "Transform photos with creative AI image editing enhancements",
    colorEnhancement: "AI Color Correction",
    colorEnhancementDesc: "Fix and enhance colors with AI photo editing technology",
    sceneTransformation: "AI Background Editor",
    sceneTransformationDesc: "Change backgrounds and environments with AI image modification",
    portraitEnhancement: "AI Portrait Editor",
    portraitEnhancementDesc: "Transform portraits with stunning AI photo editing effects and artistic styles.",
    backgroundMagic: "AI Background Magic",
    backgroundMagicDesc: "Replace backgrounds with dramatic scenes using our AI image editor.",
    moreAmazingTransformations: "More AI Photo Editing Examples",
    vehicleTransformation: "AI Vehicle Enhancement",
    vehicleTransformationDesc: "Place vehicles in fantastic environments with AI editing",
    colorStyle: "AI Color & Style Editor",
    colorStyleDesc: "Enhance colors and add artistic effects with AI photo editing"
  }
}

// 简化的useTranslation hook替代
export function useTranslation() {
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = texts
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // 如果找不到，返回原始key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return {
    t,
    locale: 'en'
  }
}

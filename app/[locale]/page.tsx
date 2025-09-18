'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wand2, 
  ImageIcon, 
  Sparkles, 
  Palette, 
  Home, 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  Clock, 
  User,
  Rocket,
  Shield,
  Award,
  Lightbulb
} from 'lucide-react'
import ImageGenerator from '../components/ImageGenerator'
import ImageToImageGeneratorV2 from '../components/ImageToImageGeneratorV2'
import CaseShowcaseV2 from '../components/CaseShowcaseV2'
import UsernameToImageGenerator from '../components/UsernameToImageGenerator'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import NavigationV2 from '../components/NavigationV2'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import BackgroundDecorations from '../components/BackgroundDecorations'

import GradientButton from '../components/ui/GradientButton'
import Card from '../components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '../../lib/use-translation'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default function HomePage({ params }: PageProps) {
  const [locale, setLocale] = useState('')
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'username-to-image' | 'text-to-image' | 'image-to-image'>('username-to-image')
  const { t } = useTranslation()

  useEffect(() => {
    const getLocale = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.locale)
      setMounted(true)
    }
    getLocale()
  }, [params])
  
  // 生成带语言前缀的链接
  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`
  }

  // 监听来自导航栏的标签切换事件
  useEffect(() => {
    const handleSwitchTab = (event: CustomEvent) => {
      const { tabId } = event.detail
      setActiveTab(tabId)
    }

    window.addEventListener('switchTab', handleSwitchTab as EventListener)
    return () => {
      window.removeEventListener('switchTab', handleSwitchTab as EventListener)
    }
  }, [])

  // 滚动到功能区域的函数
  const scrollToFeatures = () => {
    const element = document.getElementById('ai-generation')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const tabs = [
    {
      id: 'username-to-image',
      label: t('tabs.usernameToImage'),
      icon: Sparkles,
      description: t('tabs.usernameToImageDesc'),
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'text-to-image',
      label: t('tabs.textToImage'),
      icon: Wand2,
      description: t('tabs.textToImageDesc'),
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 'image-to-image',
      label: t('tabs.imageToImage'),
      icon: Palette,
      description: t('tabs.imageToImageDesc'),
      gradient: 'from-green-500 to-teal-500'
    }
  ]



  const benefits = [
    {
      icon: Lightbulb,
      title: t('benefits.creativeFreedom'),
      description: t('benefits.creativeFreedomDesc')
    },
    {
      icon: Shield,
      title: t('benefits.securePrivate'),
      description: t('benefits.securePrivateDesc')
    },
    {
      icon: Award,
      title: t('benefits.professionalResults'),
      description: t('benefits.professionalResultsDesc')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* 导航栏 */}
      <NavigationV2 />

      {/* 简化的背景装饰 */}
      <BackgroundDecorations />

      <div className="relative z-10 pt-20">
        {/* Hero Section - 拆分组件 */}
        <HeroSection locale={locale} onScrollToFeatures={scrollToFeatures} />

        {/* 功能特性卡片 - 拆分组件 */}
        <FeaturesSection />

        {/* 主要功能区域 */}
        <section id="ai-generation" className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* 标签页导航 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'username-to-image' | 'text-to-image' | 'image-to-image')}
                  className={`
                    group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold transition-all duration-300
                    ${activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl scale-105`
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200'
                    }
                  `}
                  whileHover={{ scale: activeTab === tab.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <tab.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{tab.label}</div>
                      <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* 标签页内容 */}
            <Card variant="glass" size="lg" hover={false} className="min-h-[600px]">
              <AnimatePresence mode="wait">
                {activeTab === 'username-to-image' && (
                  <motion.div
                    key="username-to-image"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UsernameToImageGenerator />
                  </motion.div>
                )}
                
                {activeTab === 'text-to-image' && (
                  <motion.div
                    key="text-to-image"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImageGenerator />
                  </motion.div>
                )}
                
                {activeTab === 'image-to-image' && (
                  <motion.div
                    key="image-to-image"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImageToImageGeneratorV2 />
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </section>

        {/* 优势介绍 */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('benefits.whyChoose')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('benefits.whyChooseDesc')}
            </p>
          </motion.div>

          {/* 对比图片展示 - 延迟加载 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 第一个对比 */}
              <Card variant="glass" hover={true} className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage="/cases/两名女子滑雪的照片.jpg"
                  afterImage="/cases/两名女子滑雪的照片-红色.png"
                  beforeLabel={t('showcase.original')}
                  afterLabel={t('showcase.aiEnhanced')}
                  height="h-64"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('showcase.styleTransformation')}</h4>
                  <p className="text-sm text-gray-600">{t('showcase.styleTransformationDesc')}</p>
                </div>
              </Card>

              {/* 第二个对比 */}
              <Card variant="glass" hover={true} className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage="/cases/冬季男子雪地上滑雪.jpg"
                  afterImage="/cases/冬季男子雪地上滑雪-红色.png"
                  beforeLabel={t('showcase.original')}
                  afterLabel={t('showcase.aiEnhanced')}
                  height="h-64"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('showcase.colorEnhancement')}</h4>
                  <p className="text-sm text-gray-600">{t('showcase.colorEnhancementDesc')}</p>
                </div>
              </Card>

              {/* 第三个对比 */}
              <Card variant="glass" hover={true} className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg"
                  afterImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶-海边.png"
                  beforeLabel={t('showcase.original')}
                  afterLabel={t('showcase.aiEnhanced')}
                  height="h-64"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('showcase.sceneTransformation')}</h4>
                  <p className="text-sm text-gray-600">{t('showcase.sceneTransformationDesc')}</p>
                </div>
              </Card>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-20 animate-pulse" />
                  <div className="relative bg-white rounded-full p-3 shadow-lg">
                    <benefit.icon className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 案例展示 */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t('showcase.realResults')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                {t('showcase.realResultsDesc')}
              </p>
              <Link href={getLocalizedHref('/blog/edit-pro-tips-ai')}>
                <GradientButton
                  size="sm"
                  variant="secondary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('showcase.masterProfessionalEditing')}
                </GradientButton>
              </Link>
            </div>
            <CaseShowcaseV2 variant="comparison" />
          </motion.div>
        </section>

        {/* 新增：AI图像编辑功能介绍 */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Complete AI Image Editing Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Our comprehensive AI photo editor combines multiple powerful tools in one platform. 
              Whether you need to fix photos, enhance images, or create entirely new visuals, 
              our AI image modifier delivers professional results instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Photo Fixer */}
            <Card variant="glass" hover={true} className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Photo Fixer</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically detect and fix photo imperfections. Our AI image fixer 
                removes noise, corrects exposure, and enhances clarity with one click.
              </p>
            </Card>

            {/* AI Image Modifier */}
            <Card variant="glass" hover={true} className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Image Modifier</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform your images with intelligent modifications. Change styles, 
                adjust colors, and apply artistic effects using advanced AI algorithms.
              </p>
            </Card>

            {/* Best AI Image Editor */}
            <Card variant="glass" hover={true} className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Best AI Image Editor</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience why users choose our platform as the best AI image editor. 
                Professional features, intuitive interface, and lightning-fast processing.
              </p>
            </Card>
          </div>

          {/* AI Editing Capabilities */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Professional AI Photo Editing Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI Edit Image with Precision</h4>
                    <p className="text-gray-600 text-sm">
                      Make precise edits to any part of your image using AI-powered selection and modification tools.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Free AI Photo Editor Access</h4>
                    <p className="text-gray-600 text-sm">
                      Enjoy full access to our free AI photo editor with no watermarks or limitations on basic features.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI Picture Editor for All Formats</h4>
                    <p className="text-gray-600 text-sm">
                      Support for all major image formats with intelligent format optimization and conversion.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Photo Editing AI Technology</h4>
                    <p className="text-gray-600 text-sm">
                      Powered by cutting-edge photo editing AI that understands context and delivers natural results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI Photoshop Alternative</h4>
                    <p className="text-gray-600 text-sm">
                      Get Photoshop-level editing capabilities without the complexity or subscription fees.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Instant AI Image Processing</h4>
                    <p className="text-gray-600 text-sm">
                      Experience lightning-fast AI image processing with results delivered in seconds, not minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 前后对比滑块 */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t('showcase.seeTheMagic')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('showcase.seeTheMagicDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 大尺寸对比展示 */}
              <Card variant="glass" size="lg" className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage="/cases/冬季男子雪地上滑雪.jpg"
                  afterImage="/cases/冬季男子雪地上滑雪-红色.png"
                  beforeLabel={t('showcase.original')}
                  afterLabel={t('showcase.aiEnhanced')}
                  height="h-80"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{t('showcase.portraitEnhancement')}</h3>
                  <p className="text-gray-600">{t('showcase.portraitEnhancementDesc')}</p>
                </div>
              </Card>

              {/* 第二个大尺寸对比 */}
              <Card variant="glass" size="lg" className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage="/cases/在水中游泳的白色monokini的女人.jpg"
                  afterImage="/cases/在水中游泳的白色monokini的女人-火山.png"
                  beforeLabel={t('showcase.original')}
                  afterLabel={t('showcase.aiEnhanced')}
                  height="h-80"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{t('showcase.backgroundMagic')}</h3>
                  <p className="text-gray-600">{t('showcase.backgroundMagicDesc')}</p>
                </div>
              </Card>
            </div>

            {/* 更多对比示例 */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">{t('showcase.moreAmazingTransformations')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card variant="glass" hover={true} className="overflow-hidden">
                  <BeforeAfterSlider 
                    beforeImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg"
                    afterImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶-2.png"
                    beforeLabel={t('showcase.original')}
                    afterLabel={t('showcase.aiEnhanced')}
                    height="h-64"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{t('showcase.vehicleTransformation')}</h4>
                    <p className="text-sm text-gray-600">{t('showcase.vehicleTransformationDesc')}</p>
                  </div>
                </Card>

                <Card variant="glass" hover={true} className="overflow-hidden">
                  <BeforeAfterSlider 
                    beforeImage="/cases/两名女子滑雪的照片.jpg"
                    afterImage="/cases/两名女子滑雪的照片-红色.png"
                    beforeLabel={t('showcase.original')}
                    afterLabel={t('showcase.aiEnhanced')}
                    height="h-64"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{t('showcase.colorStyle')}</h4>
                    <p className="text-sm text-gray-600">{t('showcase.colorStyleDesc')}</p>
                  </div>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* 简化的页面底部Logo装饰 */}
        <section className="container mx-auto px-4 py-16 relative">
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 opacity-20"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Image 
                  src="/Logo.png" 
                  alt="AI Photo Editor Logo" 
                  width={96}
                  height={96}
                  className="w-full h-full object-contain" 
                  loading="lazy"
                  priority={false}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>


    </div>
  )
} 
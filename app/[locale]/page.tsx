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
import ImageToImageGenerator from '../components/ImageToImageGenerator'
import CaseShowcase from '../components/CaseShowcase'
import UsernameToImageGenerator from '../components/UsernameToImageGenerator'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Navigation from '../components/Navigation'

import GradientButton from '../components/ui/GradientButton'
import Card from '../components/ui/Card'
import Link from 'next/link'
import { useTranslation } from '../../lib/use-translation'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const [activeTab, setActiveTab] = useState<'username-to-image' | 'text-to-image' | 'image-to-image'>('username-to-image')
  const { t } = useTranslation()
  
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

  const features = [
    {
      icon: Zap,
      title: t('features.lightningFast'),
      description: t('features.lightningFastDesc'),
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Star,
      title: t('features.premiumQuality'),
      description: t('features.premiumQualityDesc'),
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Users,
      title: t('features.userFriendly'),
      description: t('features.userFriendlyDesc'),
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Clock,
      title: t('features.alwaysAvailable'),
      description: t('features.alwaysAvailableDesc'),
      gradient: 'from-green-400 to-emerald-500'
    }
  ]

  const stats = [
    { label: t('stats.imagesGenerated'), value: '1M+', icon: ImageIcon },
    { label: t('stats.happyUsers'), value: '50K+', icon: Users },
    { label: t('stats.successRate'), value: '99.9%', icon: Award },
    { label: t('stats.responseTime'), value: '<5s', icon: Rocket }
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
      <Navigation />

      {/* 背景装饰元素 - 优化版本 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 主要装饰球 */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full"
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Logo装饰元素 */}
        <motion.div
                      className="absolute top-20 right-20 w-16 h-16 opacity-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
          </motion.div>

        <motion.div
                      className="absolute bottom-40 right-10 w-12 h-12 opacity-15"
            animate={{
              y: [0, -30, 0],
              rotate: [0, -180, -360],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
          </motion.div>

        <motion.div
                      className="absolute top-1/3 left-10 w-10 h-10 opacity-12"
            animate={{
              x: [0, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
          </motion.div>

        {/* 小装饰元素 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${
              i % 2 === 0 ? 'from-orange-400 to-yellow-400' : 'from-blue-400 to-purple-400'
            } rounded-full`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section - 重新设计 */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo和品牌 */}
            <motion.div 
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-2xl p-3 shadow-xl">
                  <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h1 className="ml-4 text-6xl md:text-7xl font-bold">
                <span className="gradient-text">{t('hero.title').split(' ').slice(0, 2).join(' ')}</span>
                <span className="text-gray-800"> {t('hero.title').split(' ').slice(2).join(' ')}</span>
              </h1>
              
              {/* 装饰性Logo元素 */}
              <motion.div
                className="absolute -top-6 -right-8 w-6 h-6 opacity-20"
                                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
                </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-6 w-4 h-4 opacity-15"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
              </motion.div>
            </motion.div>
            
            {/* 主标题和描述 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                {t('hero.subtitle')}
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t('hero.description')}
              </p>
            </motion.div>

            {/* Logo展示区域 - 位于标题下方 */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative inline-block">
                {/* 主Logo */}
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src="/Logo.png" 
                    alt="AI Photo Editor - Your Creative Assistant" 
                    className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-xl cursor-pointer"
                  />
                </motion.div>
                
                {/* 温和的发光效果 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* 简化的装饰元素 */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: [i * 90, (i * 90) + 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                  >
                    <div 
                      className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                      style={{
                        transform: `translate(-50%, -50%) translateY(-70px)`
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* 简化的文字说明 */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-lg font-semibold text-gray-600 mb-1">
                  {t('hero.creativeBananaAssistant')}
                </p>
                <p className="text-sm text-gray-500">
                  {t('hero.funAccessible')}
                </p>
              </motion.div>
            </motion.div>

            {/* 统计数据 */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full mb-3">
                    <stat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA按钮 */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <GradientButton
                size="lg"
                variant="primary"
                onClick={scrollToFeatures}
                leftIcon={<Rocket className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                shine={true}
                glow={true}
                className="min-w-[200px]"
              >
{t('hero.getStartedNow')}
              </GradientButton>
              
              <Link href="/blog/edit-pro-tips-ai">
                <GradientButton
                  size="lg"
                  variant="secondary"
                  leftIcon={<Sparkles className="w-5 h-5" />}
                  className="min-w-[200px]"
                >
{t('hero.learnAIEditingTips')}
                </GradientButton>
              </Link>

            </motion.div>

            {/* 服务介绍 */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                <span className="gradient-text">{t('hero.chooseCreativePath')}</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                {t('hero.choosePathDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href={getLocalizedHref('/seedream')}>
                  <GradientButton
                    size="sm"
                    variant="secondary"
                    leftIcon={<Zap className="w-4 h-4" />}
                  >
                    {t('hero.trySeadreamPro')}
                  </GradientButton>
                </Link>
                <Link href={getLocalizedHref('/blog')}>
                  <GradientButton
                    size="sm"
                    variant="outline"
                    leftIcon={<User className="w-4 h-4" />}
                  >
                    {t('hero.readSuccessStories')}
                  </GradientButton>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 功能特性卡片 */}
        <section className="container mx-auto px-4 py-8 relative">
          {/* 区域装饰Logo */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 opacity-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-4 right-4 w-6 h-6 opacity-12"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                variant="glass"
                hover={true}
                glow={true}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </motion.div>
        </section>

        {/* 主要功能区域 - 重新设计 */}
        <section id="ai-generation" className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* 标签页导航 - 改进版本 */}
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
                  {/* 闪光效果 */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}
                  
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

            {/* 标签页内容 - 改进版本 */}
            <Card variant="glass" size="lg" hover={false} className="min-h-[600px]">
              <AnimatePresence mode="wait">
                {activeTab === 'username-to-image' && (
                  <motion.div
                    key="username-to-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UsernameToImageGenerator />
                  </motion.div>
                )}
                
                {activeTab === 'text-to-image' && (
                  <motion.div
                    key="text-to-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageGenerator />
                  </motion.div>
                )}
                
                {activeTab === 'image-to-image' && (
                  <motion.div
                    key="image-to-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageToImageGenerator />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('benefits.whyChoose')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('benefits.whyChooseDesc')}
            </p>
          </motion.div>

          {/* 对比图片展示 */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
            <CaseShowcase variant="comparison" />
          </motion.div>
        </section>

        {/* 前后对比滑块 */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
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
        
        {/* 页面底部Logo装饰 */}
        <section className="container mx-auto px-4 py-16 relative">
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 opacity-20"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
              </motion.div>
              
              {/* 环绕的小Logo */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 opacity-10"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: [i * 45, (i * 45) + 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                >
                  <div 
                    className="w-4 h-4"
                    style={{
                      transform: `translate(-50%, -50%) translateY(-40px)`
                    }}
                  >
                    <img src="/Logo.png" alt="AI Photo Editor Logo" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>


    </div>
  )
} 
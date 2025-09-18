'use client'

import { motion } from 'framer-motion'
import { 
  Rocket,
  ArrowRight, 
  Star, 
  Users, 
  Clock, 
  User,
  Sparkles,
  Zap,
  Award,
  ImageIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import GradientButton from './ui/GradientButton'
import { useTranslation } from '../../lib/use-translation'

interface HeroSectionProps {
  locale: string
  onScrollToFeatures: () => void
}

export default function HeroSection({ locale, onScrollToFeatures }: HeroSectionProps) {
  const { t } = useTranslation()
  
  // 生成带语言前缀的链接
  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`
  }

  const stats = [
    { label: t('stats.imagesGenerated'), value: '1M+', icon: ImageIcon },
    { label: t('stats.happyUsers'), value: '50K+', icon: Users },
    { label: t('stats.successRate'), value: '99.9%', icon: Award },
    { label: t('stats.responseTime'), value: '<5s', icon: Rocket }
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div 
        className="text-center max-w-5xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo和品牌 - 简化动画 */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/15 via-orange-400/15 to-yellow-400/15 rounded-2xl blur-lg opacity-30" />
            <div className="relative bg-white rounded-2xl p-3 shadow-xl">
              <Image 
                src="/Logo.png" 
                alt="AI Photo Editor Logo" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain" 
                priority={true}
              />
            </div>
          </div>
          <h1 className="ml-4 text-6xl md:text-7xl font-bold">
            <span className="gradient-text">{t('hero.title').split(' ').slice(0, 2).join(' ')}</span>
            <span className="text-gray-800"> {t('hero.title').split(' ').slice(2).join(' ')}</span>
          </h1>
        </motion.div>
        
        {/* 主标题和描述 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            {t('hero.subtitle')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </motion.div>

        {/* Logo展示区域 - 简化动画 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative inline-block">
            {/* 主Logo - 移除浮动动画 */}
            <motion.div
              className="relative z-10"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Image 
                src="/Logo.png" 
                alt="AI Photo Editor - Your Creative Assistant" 
                width={224}
                height={224}
                className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-xl cursor-pointer"
                priority={true}
              />
            </motion.div>
            
            {/* 简化的发光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/15 via-orange-400/15 to-yellow-400/15 rounded-full blur-2xl opacity-30" />
          </div>
          
          {/* 简化的文字说明 */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GradientButton
            size="lg"
            variant="primary"
            onClick={onScrollToFeatures}
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
          transition={{ duration: 0.6, delay: 0.7 }}
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
  )
} 
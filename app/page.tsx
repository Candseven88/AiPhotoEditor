'use client'

import { useRef } from 'react'
import PageLayout from './components/PageLayout'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import CaseShowcaseV2 from './components/CaseShowcaseV2'
import BackgroundDecorations from './components/BackgroundDecorations'

export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null)

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* 背景装饰 */}
      <BackgroundDecorations />
      
      {/* 导航栏通过PageLayout组件处理 */}
      <PageLayout showLogo={false}>
        {/* Hero区域 */}
        <HeroSection onScrollToFeatures={scrollToFeatures} />
        
        {/* 功能展示区域 */}
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        
        {/* 案例展示区域 */}
        <CaseShowcaseV2 />
      </PageLayout>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import NavigationV2 from './NavigationV2'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  description?: string
  icon?: ReactNode
  logoText?: string
  showLogo?: boolean
  backgroundVariant?: 'default' | 'purple' | 'blue' | 'green'
}

export default function PageLayout({
  children,
  title,
  subtitle,
  description,
  icon,
  logoText,
  showLogo = true,
  backgroundVariant = 'default'
}: PageLayoutProps) {
  const backgroundGradients = {
    default: 'from-gray-50 via-white to-orange-50/30',
    purple: 'from-purple-50 via-pink-50 to-orange-50',
    blue: 'from-blue-50 via-white to-indigo-50/30',
    green: 'from-green-50 via-white to-emerald-50/30'
  }

  const decorationGradients = {
    default: {
      primary: 'from-orange-200/20 to-yellow-200/20',
      secondary: 'from-blue-200/20 to-purple-200/20'
    },
    purple: {
      primary: 'from-purple-400/20 to-pink-400/20',
      secondary: 'from-orange-400/20 to-yellow-400/20'
    },
    blue: {
      primary: 'from-blue-400/20 to-indigo-400/20',
      secondary: 'from-purple-400/20 to-pink-400/20'
    },
    green: {
      primary: 'from-green-400/20 to-emerald-400/20',
      secondary: 'from-blue-400/20 to-teal-400/20'
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradients[backgroundVariant]} relative overflow-hidden`}>
      {/* 导航栏 */}
      <NavigationV2 />
      
      {/* 统一的背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 主要装饰球 */}
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${decorationGradients[backgroundVariant].primary} rounded-full`}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className={`absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr ${decorationGradients[backgroundVariant].secondary} rounded-full`}
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* 小装饰元素 */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${
              i % 2 === 0 ? 'from-orange-400 to-yellow-400' : 'from-blue-400 to-purple-400'
            } rounded-full`}
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 15}%`,
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
        {/* 统一的Hero Section */}
        {(title || subtitle || description) && (
          <section className="container mx-auto px-4 py-16">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* 标题和图标 */}
              {(title || icon) && (
                <div className="flex items-center justify-center mb-8">
                  {icon && (
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="relative bg-white rounded-2xl p-4 shadow-xl">
                        {icon}
                      </div>
                    </div>
                  )}
                  {title && (
                    <h1 className={`${icon ? 'ml-6' : ''} text-5xl md:text-6xl font-bold`}>
                      <span className="gradient-text">{title}</span>
                    </h1>
                  )}
                </div>
              )}
              
              {/* 副标题 */}
              {subtitle && (
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="gradient-text">{subtitle}</span>
                </motion.h2>
              )}
              
              {/* 描述 */}
              {description && (
                <motion.p 
                  className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {description}
                </motion.p>
              )}

              {/* 统一的Logo展示区域 */}
              {showLogo && (
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <div className="relative inline-block">
                    <motion.div
                      className="relative z-10"
                      animate={{ 
                        rotate: [0, 3, -3, 0],
                        y: [0, -6, 0]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <img 
                        src="/Logo.png" 
                        alt="AI Photo Editor Logo" 
                        className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg cursor-pointer"
                      />
                    </motion.div>
                    
                    {/* 统一的光环效果 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400/15 via-yellow-400/15 to-orange-400/15 rounded-full blur-lg"
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.3, 0.15]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </div>
                  
                  {logoText && (
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <p className="text-xs font-medium text-gray-500">
                        {logoText}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </section>
        )}

        {/* 页面内容 */}
        {children}
      </div>
    </div>
  )
}

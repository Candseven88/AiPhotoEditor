'use client'

import { motion } from 'framer-motion'
import { Sparkles, Users, Target, Award, Heart, Zap, Shield, Globe } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Card from '../../components/ui/Card'
import GradientButton from '../../components/ui/GradientButton'
import { useTranslation } from '../../../lib/use-translation'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  const { t } = useTranslation()
  
  const values = [
    {
      icon: Sparkles,
      title: t('about.innovation'),
      description: t('about.innovationDesc'),
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: t('about.userCentric'),
      description: t('about.userCentricDesc'),
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Shield,
      title: t('about.privacySecurity'),
      description: t('about.privacySecurityDesc'),
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Globe,
      title: t('about.accessibility'),
      description: t('about.accessibilityDesc'),
      gradient: 'from-purple-400 to-pink-500'
    }
  ]

  const milestones = [
    {
      year: '2023',
      title: t('about.companyFounded'),
      description: t('about.companyFoundedDesc')
    },
    {
      year: '2024',
      title: t('about.firstMillionUsers'),
      description: t('about.firstMillionUsersDesc')
    },
    {
      year: '2024',
      title: t('about.advancedFeatures'),
      description: t('about.advancedFeaturesDesc')
    },
    {
      year: '2025',
      title: t('about.globalExpansion'),
      description: t('about.globalExpansionDesc')
    }
  ]

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: t('about.founderCEO'),
      description: t('about.founderDesc'),
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'Sarah Kim',
      role: t('about.headOfAI'),
      description: t('about.headOfAIDesc'),
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'David Rodriguez',
      role: t('about.leadDeveloper'),
      description: t('about.leadDeveloperDesc'),
      gradient: 'from-green-500 to-teal-500'
    },
    {
      name: 'Emily Watson',
      role: t('about.productDesigner'),
      description: t('about.productDesignerDesc'),
      gradient: 'from-purple-500 to-pink-500'
    }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      <Navigation />
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-2xl p-4 shadow-xl">
                  <Heart className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h1 className="ml-6 text-5xl md:text-6xl font-bold">
                <span className="text-gray-800">{t('about.title')}</span>
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="gradient-text">{t('about.subtitle')}</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
            
            {/* 品牌故事Logo展示 - 位于描述下方 */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <div className="relative inline-block">
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 8, 
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
                    alt="AI Photo Editor - Our Story & Mission" 
                    className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg cursor-pointer"
                  />
                </motion.div>
                
                {/* 温暖的光环效果 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400/15 via-yellow-400/15 to-orange-400/15 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* 简化的使命装饰 */}
                {['💝', '🌟'].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-base opacity-30"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: [i * 180, (i * 180) + 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 1.2
                    }}
                  >
                    <div 
                      style={{
                        transform: `translate(-50%, -50%) translateY(-50px)`
                      }}
                    >
                      {icon}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-sm font-medium text-gray-600">
                  🍌 Our story & mission
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{t('about.ourStory')}</h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    {t('about.ourStoryDesc1')}
                  </p>
                  <p>
                    {t('about.ourStoryDesc2')}
                  </p>
                  <p>
                    {t('about.ourStoryDesc3')}
                  </p>
                </div>
              </div>
              
              <Card variant="glass" hover={true} className="p-8">
                                  <div className="text-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold gradient-text mb-2">10M+</div>
                      <div className="text-sm text-gray-600">{t('about.imagesGenerated')}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text mb-2">2M+</div>
                      <div className="text-sm text-gray-600">{t('about.activeUsers')}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text mb-2">150+</div>
                      <div className="text-sm text-gray-600">{t('about.countries')}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                      <div className="text-sm text-gray-600">{t('about.uptime')}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Our Values */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{t('about.ourValues')}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('about.ourValuesDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card variant="glass" hover={true} className="text-center h-full">
                    <div className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{t('about.ourJourney')}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('about.journeyDesc')}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <Card variant="glass" hover={true} className={`max-w-md ${index % 2 === 0 ? 'ml-0' : 'mr-0'}`}>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                            {milestone.year.slice(-2)}
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">{milestone.title}</h4>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{t('about.meetOurTeam')}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('about.teamDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <Card variant="glass" hover={true} className="text-center h-full">
                    <div className="p-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
                      <div className="text-orange-600 font-medium mb-3">{member.role}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <Card variant="glass" size="lg" className="max-w-4xl mx-auto">
              <div className="p-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  {t('about.readyToCreate')}
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  {t('about.readyToCreateDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GradientButton
                    size="lg"
                    variant="primary"
                    leftIcon={<Sparkles className="w-5 h-5" />}
                    shine={true}
                    glow={true}
                    onClick={() => window.location.href = '/'}
                  >
                    {t('about.startCreatingNow')}
                  </GradientButton>
                  <GradientButton
                    size="lg"
                    variant="secondary"
                    leftIcon={<Zap className="w-5 h-5" />}
                    onClick={() => window.location.href = '/seedream'}
                  >
                    {t('about.trySeadreamPro')}
                  </GradientButton>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 
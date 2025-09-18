'use client'

import { motion } from 'framer-motion'
import { Zap, Star, Users, Clock } from 'lucide-react'
import Card from './ui/Card'
import { useTranslation } from '../../lib/use-translation'

export default function FeaturesSection() {
  const { t } = useTranslation()

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

  return (
    <section className="container mx-auto px-4 py-8 relative">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {features.map((feature, index) => (
          <Card 
            key={feature.title}
            variant="glass"
            hover={true}
            glow={true}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="text-center group"
          >
            <motion.div
              className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              whileHover={{ scale: 1.05 }}
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
  )
} 
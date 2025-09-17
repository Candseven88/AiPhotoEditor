'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, FileText, AlertCircle, Users } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Card from '../../components/ui/Card'

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      'Personal information you provide when using our services (email, name)',
      'Usage data and interaction patterns with our AI tools',
      'Images and text prompts you submit for AI generation',
      'Device information and browser data for optimization',
      'Cookies and similar tracking technologies'
    ]
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: [
      'Provide and improve our AI image generation services',
      'Process your requests and deliver generated content',
      'Communicate with you about service updates and support',
      'Analyze usage patterns to enhance user experience',
      'Ensure security and prevent fraud or abuse'
    ]
  },
  {
    icon: Users,
    title: 'Information Sharing',
    content: [
      'We do not sell or rent your personal information to third parties',
      'Service providers who help us operate our platform (under strict agreements)',
      'Legal compliance when required by law enforcement',
      'Business transfers (with notification and continued protection)',
      'Anonymized data for research and development purposes'
    ]
  },
  {
    icon: Shield,
    title: 'Data Security',
    content: [
      'Industry-standard encryption for data transmission and storage',
      'Regular security audits and vulnerability assessments',
      'Limited access to personal data on a need-to-know basis',
      'Secure cloud infrastructure with redundant backups',
      'Incident response procedures for potential breaches'
    ]
  },
  {
    icon: FileText,
    title: 'Your Rights',
    content: [
      'Access and review your personal information',
      'Request correction of inaccurate data',
      'Delete your account and associated data',
      'Data portability - export your information',
      'Opt-out of marketing communications'
    ]
  },
  {
    icon: AlertCircle,
    title: 'Data Retention',
    content: [
      'Personal information: Retained while your account is active',
      'Generated images: Stored for 30 days unless deleted sooner',
      'Usage logs: Kept for 12 months for service improvement',
      'Marketing data: Until you unsubscribe or request deletion',
      'Legal compliance data: As required by applicable laws'
    ]
  }
]

interface PageProps {
  params: {
    locale: string
  }
}

export default function PrivacyPage({ params }: PageProps) {
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
                  <Shield className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h1 className="ml-6 text-5xl md:text-6xl font-bold">
                <span className="text-gray-800">Privacy</span>
                <span className="gradient-text"> Policy</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how NanoBanana AI 
              collects, uses, and protects your personal information.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800 font-medium">
                <strong>Last Updated:</strong> January 15, 2025
              </p>
              <p className="text-blue-700 text-sm mt-2">
                We may update this policy from time to time. We'll notify you of significant changes.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Overview */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card variant="glass" size="lg" className="max-w-4xl mx-auto">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Overview</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    At NanoBanana AI, we are committed to protecting your privacy and maintaining 
                    the confidentiality of your personal information. This Privacy Policy describes 
                    our practices regarding the collection, use, and disclosure of information 
                    through our AI image generation platform.
                  </p>
                  <p>
                    We only collect information necessary to provide our services and improve 
                    your experience. We never sell your personal data to third parties, and we 
                    implement robust security measures to protect your information.
                  </p>
                  <p>
                    By using NanoBanana AI, you agree to the collection and use of information 
                    in accordance with this policy. If you have any questions or concerns, 
                    please contact us at privacy@nanobanana.ai.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Privacy Sections */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card variant="glass" hover={true}>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card variant="glass" size="lg" className="max-w-4xl mx-auto">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Questions About Your Privacy?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  If you have any questions about this Privacy Policy or our data practices, 
                  we're here to help.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Email Us</h4>
                    <p className="text-gray-600">privacy@nanobanana.ai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Data Protection Officer</h4>
                    <p className="text-gray-600">dpo@nanobanana.ai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Mailing Address</h4>
                    <p className="text-gray-600">
                      NanoBanana AI Inc.<br />
                      123 Tech Street<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Response Time</h4>
                    <p className="text-gray-600">
                      We typically respond to privacy inquiries within 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Additional Information */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card variant="glass" hover={true}>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">GDPR Compliance</h4>
                  <p className="text-gray-600 mb-4">
                    For users in the European Union, we comply with the General Data Protection 
                    Regulation (GDPR) and respect your rights under this legislation.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Right to access your data</li>
                    <li>• Right to rectification</li>
                    <li>• Right to erasure</li>
                    <li>• Right to data portability</li>
                  </ul>
                </div>
              </Card>
              
              <Card variant="glass" hover={true}>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">CCPA Compliance</h4>
                  <p className="text-gray-600 mb-4">
                    For California residents, we comply with the California Consumer Privacy Act 
                    (CCPA) and provide additional privacy rights.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Right to know about data collection</li>
                    <li>• Right to delete personal information</li>
                    <li>• Right to opt-out of sale</li>
                    <li>• Right to non-discrimination</li>
                  </ul>
                </div>
              </Card>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 
'use client'

import { motion } from 'framer-motion'
import { FileText, Shield, Users, AlertTriangle, Scale, Clock } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Card from '../../components/ui/Card'

const sections = [
  {
    icon: Users,
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using NanoBanana AI services, you agree to be bound by these Terms of Service',
      'If you do not agree to these terms, please do not use our services',
      'These terms apply to all users, including visitors, registered users, and subscribers',
      'You must be at least 13 years old to use our services',
      'If you are under 18, you need parental consent to use our platform'
    ]
  },
  {
    icon: Shield,
    title: 'Use of Our Services',
    content: [
      'You may use our services for lawful purposes only',
      'Do not generate content that is illegal, harmful, or violates others\' rights',
      'Do not attempt to reverse engineer or compromise our AI models',
      'Do not use our services to create misleading or deceptive content',
      'Respect intellectual property rights and do not infringe on copyrights'
    ]
  },
  {
    icon: FileText,
    title: 'User Content and Ownership',
    content: [
      'You retain ownership of the content you create using our AI tools',
      'You grant us a license to process your inputs to provide our services',
      'Generated images are yours to use for personal and commercial purposes',
      'You are responsible for ensuring your content complies with applicable laws',
      'We may remove content that violates our policies or applicable laws'
    ]
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content: [
      'NanoBanana AI and our technology are protected by intellectual property laws',
      'You may not copy, modify, or distribute our software or AI models',
      'Our brand, logos, and trademarks are owned by NanoBanana AI Inc.',
      'User-generated content does not infringe on our intellectual property rights',
      'We respect the intellectual property rights of others and expect users to do the same'
    ]
  },
  {
    icon: AlertTriangle,
    title: 'Prohibited Activities',
    content: [
      'Creating content that promotes violence, hatred, or discrimination',
      'Generating fake or misleading images of real people without consent',
      'Using our services for illegal activities or to violate others\' rights',
      'Attempting to hack, disrupt, or overload our systems',
      'Sharing account credentials or allowing unauthorized access'
    ]
  },
  {
    icon: Clock,
    title: 'Service Availability',
    content: [
      'We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service',
      'We may temporarily suspend services for maintenance or updates',
      'We reserve the right to modify or discontinue features with notice',
      'Service availability may vary by geographic location',
      'We are not liable for damages caused by service interruptions'
    ]
  }
]

const additionalTerms = [
  {
    title: 'Payment Terms',
    content: [
      'Subscription fees are billed in advance and are non-refundable',
      'Prices may change with 30 days notice to existing subscribers',
      'Payments are processed through secure third-party providers',
      'Failed payments may result in service suspension',
      'Refunds are provided only in exceptional circumstances'
    ]
  },
  {
    title: 'Limitation of Liability',
    content: [
      'Our services are provided "as is" without warranties of any kind',
      'We are not liable for indirect, incidental, or consequential damages',
      'Our total liability is limited to the amount paid for our services',
      'You use our services at your own risk and discretion',
      'Some jurisdictions may not allow these limitations'
    ]
  },
  {
    title: 'Termination',
    content: [
      'You may terminate your account at any time through your account settings',
      'We may suspend or terminate accounts that violate these terms',
      'Upon termination, your access to paid features will cease',
      'We may retain some data as required by law or for legitimate business purposes',
      'Termination does not affect rights and obligations that arose before termination'
    ]
  }
]

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params
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
                  <FileText className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h1 className="ml-6 text-5xl md:text-6xl font-bold">
                <span className="text-gray-800">Terms of</span>
                <span className="gradient-text"> Service</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of NanoBanana AI services. Please read them carefully 
              before using our platform.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <p className="text-amber-800 font-medium">
                <strong>Effective Date:</strong> January 15, 2025
              </p>
              <p className="text-amber-700 text-sm mt-2">
                By using our services, you acknowledge that you have read, understood, and agree to these terms.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms Overview</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Welcome to NanoBanana AI! These Terms of Service ("Terms") govern your access 
                    to and use of our AI-powered image generation platform and related services. 
                    By using our services, you enter into a legal agreement with NanoBanana AI Inc.
                  </p>
                  <p>
                    We provide cutting-edge AI tools for creating, editing, and transforming images. 
                    Our goal is to make AI technology accessible while maintaining high standards 
                    of quality, security, and ethical use.
                  </p>
                  <p>
                    These terms may be updated from time to time. We will notify you of significant 
                    changes and the updated terms will be effective upon posting. Your continued 
                    use of our services constitutes acceptance of the revised terms.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Main Terms Sections */}
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

        {/* Additional Terms */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Additional Terms</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Important additional terms that govern specific aspects of our service
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {additionalTerms.map((term, index) => (
                <motion.div
                  key={term.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <Card variant="glass" hover={true} className="h-full">
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{term.title}</h4>
                      <ul className="space-y-2">
                        {term.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Governing Law */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Card variant="glass" size="lg" className="max-w-4xl mx-auto">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Governing Law and Disputes</h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    These Terms of Service are governed by and construed in accordance with the 
                    laws of the State of California, United States, without regard to its conflict 
                    of law principles.
                  </p>
                  <p>
                    Any disputes arising out of or relating to these terms or our services shall 
                    be resolved through binding arbitration in accordance with the Commercial 
                    Arbitration Rules of the American Arbitration Association.
                  </p>
                  <p>
                    The arbitration will be conducted in San Francisco, California, and judgment 
                    on the arbitral award may be entered in any court having jurisdiction thereof.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Contact Information */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Card variant="glass" size="lg" className="max-w-4xl mx-auto">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Questions About These Terms?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  If you have any questions about these Terms of Service, please contact us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Legal Department</h4>
                    <p className="text-gray-600">legal@nanobanana.ai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">General Support</h4>
                    <p className="text-gray-600">support@nanobanana.ai</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Mailing Address</h4>
                    <p className="text-gray-600">
                      NanoBanana AI Inc.<br />
                      Legal Department<br />
                      123 Tech Street<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Response within 2-3 business days
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 
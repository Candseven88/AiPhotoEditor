'use client'

import { Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react'
import PageLayout from '../components/PageLayout'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Usage data: How you interact with our AI photo editing tools',
        'Device information: Browser type, operating system, and device identifiers',
        'Image metadata: Technical information about uploaded images (not the images themselves)',
        'Communication data: Messages you send us for support or feedback'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'To provide and improve our AI photo editing services',
        'To analyze usage patterns and optimize performance',
        'To respond to your support requests and feedback',
        'To ensure the security and integrity of our platform'
      ]
    },
    {
      title: 'Data Protection Measures',
      icon: Lock,
      content: [
        'End-to-end encryption for all image processing',
        'Automatic deletion of uploaded images after processing',
        'Secure cloud infrastructure with industry-standard protections',
        'Regular security audits and vulnerability assessments'
      ]
    },
    {
      title: 'Your Rights',
      icon: Users,
      content: [
        'Access: Request information about data we have about you',
        'Correction: Ask us to correct any inaccurate information',
        'Deletion: Request deletion of your personal data',
        'Portability: Receive your data in a structured, machine-readable format'
      ]
    }
  ]

  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Your Privacy is Our Priority"
      description="Learn how we protect your privacy and handle your data when you use our AI photo editing services."
      icon={<Shield className="w-8 h-8 text-purple-600" />}
      backgroundVariant="purple"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              At AI Photo Editor, we believe that privacy is a fundamental right. This Privacy Policy explains 
              how we collect, use, and protect your information when you use our AI-powered photo editing services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Last updated:</strong> January 2024
            </p>
          </div>
        </section>

        {/* Key Principles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Privacy Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Clear information about what data we collect and why</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Security</h3>
              <p className="text-sm text-gray-600">Industry-leading security measures to protect your data</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Control</h3>
              <p className="text-sm text-gray-600">You have full control over your personal information</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Minimization</h3>
              <p className="text-sm text-gray-600">We only collect data that's necessary for our services</p>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="mb-12">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Image Processing Policy */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Special Note: Image Processing</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>We do NOT store your images:</strong> All images you upload are processed in real-time 
                and automatically deleted from our servers immediately after processing is complete.
              </p>
              <p>
                <strong>Secure Processing:</strong> Your images are encrypted during transmission and processing. 
                Our AI models process your images without human intervention or review.
              </p>
              <p>
                <strong>No Training Data:</strong> We do not use your uploaded images to train our AI models 
                or for any other purpose beyond providing the requested editing service.
              </p>
            </div>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Third-Party Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Analytics</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We use privacy-focused analytics to understand how our service is used and to improve performance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Payment Processing</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Payment information is processed securely by PayPal and is not stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions About Privacy?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> candseven2015@gmail.com</p>
              <p><strong>Subject:</strong> Privacy Policy Question</p>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Policy Updates</h3>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons.
            </p>
            <p className="text-gray-600">
              When we make significant changes, we will notify users through our website and update 
              the "Last updated" date at the top of this policy.
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

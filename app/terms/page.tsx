'use client'

import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import PageLayout from '../components/PageLayout'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptable Use',
      icon: CheckCircle,
      content: [
        'Use our AI photo editing services for legitimate creative and business purposes',
        'Respect intellectual property rights of others',
        'Only upload images you own or have permission to edit',
        'Follow applicable laws and regulations in your jurisdiction'
      ]
    },
    {
      title: 'Prohibited Activities',
      icon: XCircle,
      content: [
        'Uploading illegal, harmful, or offensive content',
        'Attempting to reverse engineer or copy our AI models',
        'Using our service to create deepfakes or misleading content',
        'Violating any applicable laws or third-party rights'
      ]
    },
    {
      title: 'Service Availability',
      icon: Info,
      content: [
        'We strive for 99.9% uptime but cannot guarantee uninterrupted service',
        'Scheduled maintenance may temporarily affect availability',
        'We reserve the right to modify or discontinue features with notice',
        'Emergency maintenance may occur without prior notice'
      ]
    }
  ]

  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Terms and Conditions of Use"
      description="Please read these terms carefully before using our AI photo editing services. By using our platform, you agree to these terms and conditions."
      icon={<FileText className="w-8 h-8 text-indigo-600" />}
      backgroundVariant="blue"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <Scale className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Agreement to Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using AI Photo Editor ("we," "our," or "us"), you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Effective Date:</strong> January 2024 | <strong>Last Updated:</strong> January 2024
            </p>
          </div>
        </section>

        {/* Key Terms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Terms and Conditions</h2>
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Terms */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Responsibilities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">User Responsibilities</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Account Security</h4>
                  <p className="text-sm">You are responsible for maintaining the security of your account and any activities that occur under your account.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Content Ownership</h4>
                  <p className="text-sm">You must own or have the right to use any images you upload to our service.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Compliance</h4>
                  <p className="text-sm">You agree to comply with all applicable laws and regulations when using our service.</p>
                </div>
              </div>
            </div>

            {/* Our Rights and Responsibilities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Rights & Responsibilities</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Service Provision</h4>
                  <p className="text-sm">We will provide AI photo editing services to the best of our ability and maintain reasonable uptime.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Content Moderation</h4>
                  <p className="text-sm">We reserve the right to refuse service or remove content that violates these terms.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Service Updates</h4>
                  <p className="text-sm">We may update, modify, or discontinue features with reasonable notice to users.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Free Services</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Most of our AI photo editing features are provided free of charge with no hidden fees.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Premium Features</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Some advanced features may require payment. Prices are clearly displayed before purchase.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Refunds</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Refunds are handled on a case-by-case basis. Contact us if you experience technical issues.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Payment Processing</h4>
                <p className="text-gray-600 text-sm mb-4">
                  All payments are processed securely through PayPal. We do not store payment information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Intellectual Property</h3>
            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Your Content</h4>
                <p>You retain all rights to images you upload and create using our service. We do not claim ownership of your creative work.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Our Technology</h4>
                <p>Our AI models, algorithms, and platform technology remain our intellectual property and are protected by applicable laws.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">License to Use</h4>
                <p>You grant us a limited license to process your images solely for the purpose of providing our editing services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Limitation of Liability</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Our service is provided "as is" without warranties of any kind. We are not liable for any damages 
                arising from the use of our service, including but not limited to direct, indirect, incidental, 
                or consequential damages.
              </p>
              <p>
                We do not guarantee that our service will be error-free, secure, or continuously available. 
                Users assume all risks associated with using AI-generated or edited content.
              </p>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Termination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">By You</h4>
                <p className="text-gray-600 text-sm">You may stop using our service at any time. No formal termination process is required.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">By Us</h4>
                <p className="text-gray-600 text-sm">We may terminate access for violations of these terms or for any reason with reasonable notice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact and Changes */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions or Concerns?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> candseven2015@gmail.com</p>
                <p><strong>Subject:</strong> Terms of Service Question</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h3>
              <p className="text-gray-600 mb-4">
                We may update these terms from time to time. Significant changes will be communicated through our website.
              </p>
              <p className="text-gray-600">
                Continued use of our service after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h3>
            <p className="text-gray-600">
              These terms are governed by and construed in accordance with applicable international laws 
              and regulations for online services. Any disputes will be resolved through good faith negotiation.
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

'use client'

import { Info, Target, Users, Award, Zap, Heart, Globe, Shield } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import GradientButton from '../components/ui/GradientButton'

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate and edit images in seconds with our optimized AI models'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your images are processed securely and never stored on our servers'
    },
    {
      icon: Globe,
      title: 'Globally Accessible',
      description: 'Available 24/7 from anywhere in the world, no downloads required'
    },
    {
      icon: Heart,
      title: 'User Focused',
      description: 'Designed with simplicity and user experience as our top priorities'
    }
  ]

  const stats = [
    { label: 'Happy Users', value: '50K+', icon: Users },
    { label: 'Images Generated', value: '1M+', icon: Award },
    { label: 'Countries Served', value: '120+', icon: Globe },
    { label: 'Uptime', value: '99.9%', icon: Zap }
  ]

  const team = [
    {
      name: 'AI Research Team',
      role: 'Developing cutting-edge AI models',
      description: 'Our team of AI researchers and engineers work tirelessly to improve our image generation and editing capabilities.'
    },
    {
      name: 'Design Team',
      role: 'Creating beautiful user experiences',
      description: 'Our designers ensure that powerful AI technology is accessible through intuitive and beautiful interfaces.'
    },
    {
      name: 'Community Team',
      role: 'Supporting our users',
      description: 'Dedicated to helping users get the most out of our AI photo editing tools through support and education.'
    }
  ]

  return (
    <PageLayout
      title="About Us"
      subtitle="Democratizing AI Photo Editing for Everyone"
      description="Learn about our mission to make professional-quality AI photo editing accessible to creators, businesses, and individuals worldwide."
      icon={<Info className="w-8 h-8 text-green-600" />}
      backgroundVariant="green"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe that everyone should have access to professional-quality photo editing tools. 
              Our mission is to democratize AI-powered image editing by making it free, fast, and accessible 
              to creators, businesses, and individuals around the world.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What We Stand For</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Accessibility</h4>
                  <p className="text-gray-600 text-sm">
                    Professional AI editing tools should be available to everyone, regardless of technical expertise or budget.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Innovation</h4>
                  <p className="text-gray-600 text-sm">
                    We continuously push the boundaries of what's possible with AI image generation and editing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Privacy</h4>
                  <p className="text-gray-600 text-sm">
                    Your creative work is yours. We prioritize user privacy and data security in everything we do.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Community</h4>
                  <p className="text-gray-600 text-sm">
                    We're building a community of creators who inspire and learn from each other.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Technology</h2>
            <p className="text-lg text-gray-600 mb-8">
              We leverage cutting-edge AI models and cloud infrastructure to deliver fast, 
              reliable, and high-quality image editing capabilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced AI Models</h3>
                <p className="text-gray-600">
                  Our AI models are trained on diverse datasets and optimized for speed and quality, 
                  ensuring consistent results across different image types and styles.
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Cloud Infrastructure</h3>
                <p className="text-gray-600">
                  Built on robust cloud infrastructure that scales automatically to handle millions 
                  of image processing requests while maintaining high availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
            <GradientButton
              variant="primary"
              size="lg"
              onClick={() => window.location.href = 'mailto:candseven2015@gmail.com?subject=Hello from AI Photo Editor'}
            >
              Contact Us
            </GradientButton>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

'use client'

import { useState } from 'react'
import { MessageSquare, Star, Send, Heart, Lightbulb, Bug, ThumbsUp } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import GradientButton from '../components/ui/GradientButton'

export default function FeedbackPage() {
  const [selectedType, setSelectedType] = useState('general')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const feedbackTypes = [
    {
      id: 'general',
      label: 'General Feedback',
      icon: MessageSquare,
      description: 'Share your overall experience'
    },
    {
      id: 'feature',
      label: 'Feature Request',
      icon: Lightbulb,
      description: 'Suggest new features or improvements'
    },
    {
      id: 'bug',
      label: 'Bug Report',
      icon: Bug,
      description: 'Report technical issues or problems'
    },
    {
      id: 'compliment',
      label: 'Compliment',
      icon: Heart,
      description: 'Share what you love about our service'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Artist',
      content: 'The AI photo editing tools are incredible! I can create professional-quality artwork in minutes.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Small Business Owner',
      content: 'Perfect for creating social media content. The image generator saves me hours of work.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Content Creator',
      content: 'Love how easy it is to use. The results are consistently amazing and the interface is intuitive.',
      rating: 5
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <PageLayout
      title="Feedback"
      subtitle="Help Us Improve Your AI Photo Editing Experience"
      description="Your feedback helps us make our AI photo editing tools better. Share your thoughts, suggestions, or report issues to help us serve you better."
      icon={<MessageSquare className="w-8 h-8 text-pink-600" />}
      backgroundVariant="pink"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Feedback Form */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Share Your Feedback</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center">
                    <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Thank you for your feedback! We appreciate your input.</span>
                  </div>
                </div>
              )}

              {/* Feedback Type Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What type of feedback do you have?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedType === type.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-25'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <type.icon className={`w-5 h-5 mr-2 ${
                          selectedType === type.id ? 'text-pink-600' : 'text-gray-600'
                        }`} />
                        <span className={`font-medium ${
                          selectedType === type.id ? 'text-pink-800' : 'text-gray-800'
                        }`}>
                          {type.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How would you rate our service?</h3>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-4 text-gray-600">
                      {rating === 5 && '🤩 Excellent!'}
                      {rating === 4 && '😊 Great!'}
                      {rating === 3 && '🙂 Good'}
                      {rating === 2 && '😐 Okay'}
                      {rating === 1 && '😞 Needs improvement'}
                    </span>
                  )}
                </div>
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Brief description of your feedback"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Please share your detailed feedback, suggestions, or describe any issues you've encountered..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="your.email@example.com (if you'd like a response)"
                  />
                </div>

                <div className="text-center">
                  <GradientButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    Send Feedback
                  </GradientButton>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Other Ways to Reach Us</h3>
            <p className="text-gray-600 mb-6">
              Have urgent issues or prefer direct contact? We're here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/80 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Email Support</h4>
                <p className="text-sm text-gray-600">candseven2015@gmail.com</p>
                <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Bug Reports</h4>
                <p className="text-sm text-gray-600">Include screenshots if possible</p>
                <p className="text-xs text-gray-500 mt-1">Help us fix issues faster</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

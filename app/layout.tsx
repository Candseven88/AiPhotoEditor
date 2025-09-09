import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from '../src/components/providers/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NanoBanana AI - Advanced AI Image Generation',
  description: 'Transform your ideas into stunning visuals with our advanced AI image generation platform. Create personalized avatars, generate images from text, and transform photos with cutting-edge AI technology.',
  keywords: 'AI, image generation, artificial intelligence, avatar, text to image, image to image, NanoBanana',
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
} 
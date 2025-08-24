import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NanoBanana AI - Lightweight AI Image Generator | Text to Image & Image to Image',
  description: 'Experience the power of nano banana ai technology with our lightweight AI image generator. Create stunning visuals from text descriptions or transform existing images with natural language editing powered by Google nano-banana model.',
  keywords: 'nano banana ai, AI image generator, text-to-image, image-to-image, lightweight image ai, Google nano-banana model, natural language editing, photo editing AI',
  authors: [{ name: 'NanoBanana AI Team' }],
  creator: 'NanoBanana AI',
  publisher: 'NanoBanana AI',
  robots: 'index, follow',
  openGraph: {
    title: 'NanoBanana AI - Revolutionary Lightweight AI Image Generator',
    description: 'Transform your ideas into stunning images with our nano banana ai technology. Fast, efficient, and professional-quality AI image generation.',
    type: 'website',
    locale: 'en_US',
    siteName: 'NanoBanana AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NanoBanana AI - Lightweight AI Image Generator',
    description: 'Create stunning visuals with our revolutionary nano banana ai technology',
  },
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
        {children}
      </body>
    </html>
  )
} 
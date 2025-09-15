import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Photo Editor - Advanced AI Image Generation',
  description: 'Transform your ideas into stunning visuals with our advanced AI image generation platform. Create personalized avatars, generate images from text, and transform photos with cutting-edge AI technology.',
  keywords: 'AI, image generation, artificial intelligence, avatar, text to image, image to image, AI Photo Editor',
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
  verification: {
    google: 'PnF_JUbsBtHyPbnWvat0KgdAXjCaj9TdlBIXBWUmnJQ',
  },
  metadataBase: new URL('https://www.aiphotoeditor.dev'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTQMD39NCB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LTQMD39NCB');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tb0ukafpv1");
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
} 
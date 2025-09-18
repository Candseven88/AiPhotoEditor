/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图像优化配置
  images: {
    formats: ['image/webp', 'image/avif'], // 现代图像格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1年缓存
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['open.bigmodel.cn', 'aiphotoeditor.space', 'www.aiphotoeditor.space'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open.bigmodel.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'] // 生产环境移除console.log但保留console.error
    } : false,
  },

  // 压缩和优化
  compress: true,
  poweredByHeader: false, // 移除X-Powered-By头
  
  // 缓存优化
  generateEtags: true,
  
  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 安全头
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // 性能头
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge'
          },
        ],
      },
      // 静态资源缓存
      {
        source: '/Logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1年缓存
          },
        ],
      },
      {
        source: '/cases/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1年缓存
          },
        ],
      },
      // API路由缓存
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 
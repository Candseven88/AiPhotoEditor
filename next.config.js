/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用实验性功能
  experimental: {
    optimizeCss: true, // 优化CSS
    scrollRestoration: true, // 滚动位置恢复
  },
  
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
  
  // 输出配置
  output: 'standalone',
  
  // 性能优化
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // 页面在内存中保持活跃的时间
    pagesBufferLength: 2, // 同时保持在内存中的页面数量
  },

  // 缓存优化
  generateEtags: true,
  
  // 重定向和重写
  async redirects() {
    return []
  },

  async rewrites() {
    return []
  },

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

  // Webpack配置优化
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      // 代码分割优化
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // 框架代码单独打包
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // 第三方库单独打包
          lib: {
            test(module) {
              return (
                module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier())
              )
            },
            name(module) {
              // 使用简单的哈希方法替代crypto
              const identifier = module.identifier()
              let hash = 0
              for (let i = 0; i < identifier.length; i++) {
                const char = identifier.charCodeAt(i)
                hash = ((hash << 5) - hash) + char
                hash = hash & hash // 转换为32位整数
              }
              return Math.abs(hash).toString(16).substring(0, 8)
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // 公共组件
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      }
    }

    return config
  },

  // 环境变量
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['open.bigmodel.cn'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open.bigmodel.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 
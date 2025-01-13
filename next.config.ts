import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/proiect-4-html-css-js-3lv',
  distDir: 'docs',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Compressão e otimizações de performance
  compress: true,

  // Otimização de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Headers para SEO e Performance
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
    {
      source: '/sitemap.xml',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/xml; charset=utf-8',
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=3600',
        },
      ],
    },
    {
      source: '/robots.txt',
      headers: [
        {
          key: 'Content-Type',
          value: 'text/plain; charset=utf-8',
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=3600',
        },
      ],
    },
  ],

  // Otimizações de bundle
  productionBrowserSourceMaps: false,

  // Redirecionamentos (se necessário)
  redirects: async () => [
    // Adicione redirecionamentos aqui conforme necessário
  ],

  // Rewrite (se necessário)
  rewrites: async () => ({
    beforeFiles: [
      // Adicione rewrites aqui conforme necessário
    ],
  }),
}

export default nextConfig

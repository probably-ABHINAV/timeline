
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'i.scdn.co', 'mosaic.scdn.co'],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig

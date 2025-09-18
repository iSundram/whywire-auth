/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Cloudflare Pages with edge runtime
  experimental: {
    serverComponentsExternalPackages: ['appwrite']
  },
  
  // Enable images optimization for Cloudflare
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for Cloudflare Pages
  experimental: {
    serverComponentsExternalPackages: ['appwrite']
  },
  
  // Disable image optimization
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig

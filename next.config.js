/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Cloudflare Pages with @cloudflare/next-on-pages
  experimental: {
    // Remove invalid runtime config
    serverComponentsExternalPackages: ['appwrite']
  },
  // Enable images optimization for Cloudflare
  images: {
    // Cloudflare Images can be used or fallback to unoptimized
    loader: 'custom',
    loaderFile: './lib/cloudflare-image-loader.js'
  }
}

module.exports = nextConfig

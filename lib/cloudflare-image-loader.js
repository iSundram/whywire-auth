// Simple image loader for Cloudflare Pages
export default function cloudflareLoader({ src, width, quality }) {
  // For Cloudflare Images, you can use Cloudflare's image optimization
  // For now, we'll just return the original src
  return src;
}
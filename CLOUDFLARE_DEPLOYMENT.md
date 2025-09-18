# Cloudflare Deployment Guide

This guide explains how to deploy the Appwrite-integrated AuthKit application to Cloudflare Pages or Workers.

## Cloudflare Pages Deployment

### Prerequisites
- Cloudflare account
- GitHub repository with your code
- Appwrite project set up

### Step 1: Connect Repository
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** > **Create a project**
3. Connect your GitHub account and select this repository

### Step 2: Configure Build Settings
```
Build command: npm run build
Output directory: .next
```

### Step 3: Environment Variables
Add these in Cloudflare Pages settings:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-appwrite-project-id
JWT_SECRET_KEY=your-super-secret-jwt-key-at-least-32-chars-long
```

### Step 4: Update Appwrite Redirects
In your Appwrite project dashboard, add production URLs:
```
https://your-app.pages.dev/using-hosted-authkit/basic/callback
https://your-app.pages.dev/using-hosted-authkit/with-session/callback
```

## Cloudflare Workers Deployment

### Prerequisites
- Install Wrangler CLI: `npm install -g wrangler`
- Authenticate: `wrangler login`

### Step 1: Install Next.js on Pages adapter
```bash
npm install @cloudflare/next-on-pages
```

### Step 2: Create wrangler.toml
```toml
name = "authkit-appwrite"
compatibility_date = "2024-01-01"

[env.production.vars]
NEXT_PUBLIC_APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID = "your-project-id"
JWT_SECRET_KEY = "your-secret-key"
```

### Step 3: Deploy
```bash
npx @cloudflare/next-on-pages
npx wrangler pages deploy .vercel/output/static
```

## Security Considerations

### Environment Variables
- Never commit `.env.local` to version control
- Use Cloudflare's environment variable management
- Rotate JWT secrets regularly

### CORS Configuration
In Appwrite dashboard, ensure your Cloudflare domain is in allowed origins:
```
https://your-app.pages.dev
https://your-custom-domain.com
```

### HTTPS Only
- Ensure `secure` flag is set for cookies in production
- Update OAuth redirects to use HTTPS

## Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check Cloudflare build logs for specific errors
- Verify Node.js version compatibility

### Authentication Issues
- Verify Appwrite project ID and endpoint
- Check OAuth redirect URLs match exactly
- Ensure CORS is configured correctly in Appwrite

### Session Problems
- Check JWT secret is properly set
- Verify cookie security settings
- Check network requests in browser dev tools

## Performance Optimization

### Edge Caching
Configure Cloudflare caching rules for static assets:
- Cache CSS/JS for 1 year
- Cache images for 30 days
- Don't cache API routes

### Geographic Distribution
Cloudflare automatically distributes your app globally for optimal performance.

## Monitoring

Use Cloudflare Analytics to monitor:
- Page load times
- User locations
- Error rates
- Authentication success rates

## Support

For deployment issues:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
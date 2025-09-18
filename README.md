<p align="center">
    <img src="https://github.com/workos/authkit/assets/896475/9fa7a91e-f5a8-4922-96fb-20a7b478d075" width="72" />
    <h1 align="center">AuthKit with Appwrite</h1>
    <p align="center">Appwrite authentication integration ready for Cloudflare Pages/Workers deployment</p>    
    <p align="center"><a href="https://appwrite.io/docs/references/cloud/client-web/account">Explore Appwrite docs ↗</a></strong></p>    
</p>

<p align="center">  
  <img alt="Screenshot of Appwrite authentication" src="https://github.com/user-attachments/assets/f17910c8-d32f-4e21-b4dd-637669ef5501">
</p>

## Examples

This repository has been migrated from WorkOS to **Appwrite** for authentication, making it suitable for deployment on Cloudflare Pages or Workers:

- **[Working Appwrite Authentication](./src/app/using-hosted-authkit/with-session)** ✅
  - OAuth integration (Google, GitHub, etc.)
  - JWT-based session management
  - Server-side authentication checks
  - Secure logout functionality

- **[Basic OAuth Example](./src/app/using-hosted-authkit/basic)** ✅
  - Simple Appwrite OAuth flow demonstration
  - User data handling

- **[Migration Examples](./src/app/using-your-own-ui)** ⚠️
  - Disabled with migration notes for developers
  - Shows how to implement custom UI with Appwrite SDK

## Prerequisites

You will need an [Appwrite account](https://cloud.appwrite.io/) or self-hosted Appwrite instance.

## Setup & Running

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up your Appwrite project**
   - Create a new project in [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
   - Enable OAuth providers (Google, GitHub, etc.) in the Auth settings
   - Add your domain to the allowed origins

3. **Configure environment variables**
   
   Rename `.env.local.example` to `.env.local` and configure:

   ```bash
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id

   # JWT Secret for session management (must be at least 32 characters long)
   JWT_SECRET_KEY=your-super-secret-jwt-key-that-is-at-least-32-characters-long
   ```

4. **Configure OAuth redirects in Appwrite Dashboard**
   
   Add these redirect URLs in your Appwrite project settings:

   ```bash
   http://localhost:3000/using-hosted-authkit/basic/callback
   http://localhost:3000/using-hosted-authkit/with-session/callback
   ```

   For production, replace `localhost:3000` with your domain.

5. **Run the application**
   ```bash
   npm run dev
   ```
   Navigate to http://localhost:3000

## Deployment on Cloudflare

This application is optimized for Cloudflare Pages/Workers deployment:

### Cloudflare Pages
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Add environment variables in Cloudflare dashboard

### Cloudflare Workers
1. Use `@cloudflare/next-on-pages` for deployment
2. Configure wrangler.toml with your environment variables
3. Deploy with: `npx wrangler pages deploy`

## Architecture

### Appwrite Integration
- **Authentication**: OAuth2 flows via Appwrite's REST API
- **Session Management**: JWT tokens stored in HTTP-only cookies
- **User Management**: Direct integration with Appwrite's account service
- **Security**: Server-side authentication checks

### File Structure
```
src/
├── app/
│   ├── using-hosted-authkit/
│   │   ├── with-session/          # Main working example
│   │   │   ├── auth.ts            # Authentication utilities
│   │   │   ├── callback/route.ts  # OAuth callback handler
│   │   │   └── page.tsx           # Main auth page
│   │   └── basic/                 # Simple OAuth example
│   └── using-your-own-ui/         # Migration examples (disabled)
├── lib/
│   ├── appwrite.ts                # Appwrite client configuration
│   └── appwrite-placeholders.ts   # Placeholder implementations
└── middleware.ts                  # Disabled for Appwrite (optional)
```

## Migration from WorkOS

This codebase was successfully migrated from WorkOS to Appwrite:

- ✅ **Dependencies**: Replaced `@workos-inc/*` with `appwrite`
- ✅ **OAuth Flows**: Updated to use Appwrite OAuth endpoints
- ✅ **Session Management**: Migrated to JWT with Appwrite user data
- ✅ **Environment Setup**: New configuration for Appwrite
- ⚠️ **Advanced Features**: Placeholder implementations with migration notes

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - see LICENSE file for details.

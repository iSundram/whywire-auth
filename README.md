<p align="center">
    <img src="https://appwrite.io/images-ee/blog/appwrite-13-1.png" width="72" />
    <h1 align="center">AuthKit with Appwrite</h1>
    <p align="center">Authentication examples using Appwrite backend for user management, sessions, and OAuth</p>    
    <p align="center"><a href="https://appwrite.io/docs/products/auth">Explore Appwrite Auth docs ↗</a></strong></p>    
</p>

<p align="center">  
  <img alt="Screenshot of Appwrite authentication" src="https://appwrite.io/images-ee/products/auth/auth-hero.png">
</p>

## Examples

This repository contains examples for using Appwrite as the authentication backend with custom UI components:

- [Using your own custom UI](./src/app/using-your-own-ui)
  Build your own authentication UI by integrating directly with Appwrite's authentication APIs. Includes examples for:
  - Email/password authentication
  - Magic link authentication  
  - OAuth with Google, GitHub, Microsoft
  - Password reset functionality
  - User management and profile updates

- [Using hosted UI examples](./src/app/using-hosted-authkit) 
  Modified examples showing how to integrate with Appwrite sessions (adapted from the original AuthKit hosted examples)

## WhyWire Domain Configuration

This authentication system is configured for the WhyWire ecosystem:

- **Auth Domain**: `auth.whywire.app` - Hosts the authentication UI
- **Dashboard Domain**: `dashboard.whywire.app` - Where users are redirected after successful login
- **Cross-domain cookies**: Configured to work across `*.whywire.app` subdomains

## Appwrite Setup for WhyWire

1. Create a new project in [Appwrite Cloud](https://cloud.appwrite.io/) 
2. Go to **Auth** → **Settings** and configure:
   - Enable Email/Password authentication
   - Enable Magic URL authentication  
   - Configure OAuth providers with these redirect URLs:

   ```bash
   # Production OAuth Redirects
   https://auth.whywire.app/auth/callback/google
   https://auth.whywire.app/auth/callback/github  
   https://auth.whywire.app/auth/callback/microsoft
   
   # Development OAuth Redirects
   http://localhost:3000/auth/callback/google
   http://localhost:3000/auth/callback/github
   http://localhost:3000/auth/callback/microsoft
   ```

3. Add platforms in Appwrite:
   - **Web Platform**: `https://auth.whywire.app` (production)
   - **Web Platform**: `https://dashboard.whywire.app` (for cross-domain cookies)
   - **Web Platform**: `http://localhost:3000` (development)

## Environment Configuration

For **auth.whywire.app** deployment, set these environment variables:

```bash
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT="your-whywire-project-id"

# WhyWire Domain Configuration  
NEXT_PUBLIC_AUTH_DOMAIN="https://auth.whywire.app"
NEXT_PUBLIC_DASHBOARD_URL="https://dashboard.whywire.app"
NEXTAUTH_URL="https://auth.whywire.app"
NEXTAUTH_SECRET="your-secure-random-string"

# Optional: Database and Collection IDs
NEXT_PUBLIC_APPWRITE_DATABASE_ID="your-database-id"
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID="your-user-collection-id"
```

## Authentication Flow

1. **User visits**: `auth.whywire.app` 
2. **Signs in via**: Email/password, Magic link, or OAuth
3. **Gets redirected to**: `dashboard.whywire.app` after successful authentication
4. **Session shared**: Across `*.whywire.app` domains via secure cookies

## OAuth Provider Setup

Configure these success URLs in your OAuth provider settings:

- **Google**: `https://auth.whywire.app/auth/callback/google`
- **GitHub**: `https://auth.whywire.app/auth/callback/github` 
- **Microsoft**: `https://auth.whywire.app/auth/callback/microsoft`

All OAuth flows will automatically redirect users to `dashboard.whywire.app` after successful authentication.

## Deployment to Cloudflare Pages

This application is configured to deploy to Cloudflare Pages:

1. Build for Cloudflare: `npm run pages:build`
2. Preview locally: `npm run preview` 
3. Deploy: `npm run deploy`

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

### Environment Variables for Production

Set these in your Cloudflare Pages dashboard:

- `NEXT_PUBLIC_APPWRITE_ENDPOINT` - Your Appwrite endpoint
- `NEXT_PUBLIC_APPWRITE_PROJECT` - Your Appwrite project ID  
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - A secure random string

## Key Features

- 🔐 **Email/Password Authentication** - Traditional sign up and sign in
- ✨ **Magic Link Authentication** - Passwordless authentication via email
- 🔗 **OAuth Integration** - Google, GitHub, Microsoft OAuth providers
- 🔄 **Password Reset** - Secure password recovery flow
- 👤 **User Management** - Profile updates and user data management
- 🛡️ **Session Management** - Secure session handling with HTTP-only cookies
- ⚡ **Edge Ready** - Optimized for Cloudflare Pages/Workers deployment
- 🎨 **Custom UI** - Full control over authentication user interface

## Examples

There are two ways to use AuthKit and this repository contains examples for both:

- [Using AuthKit's hosted UI](./src/app/using-hosted-authkit)
  This is the fastest way to add authentication to your app with AuthKit and WorkOS User Management. It includes a fully themeable hosted UI that handles all of your authentication flows. When you're ready to go to production you can point it to a custom domain (`auth.yourapp.com`) to match your application.
- [Using your own custom UI](./src/app/using-your-own-ui)
  Use all of the features of AuthKit, but build out the UI yourself in your own codebase by integrating directly with the headless WorkOS User Management APIs. Your authentication UI will be self-hosted in your application.

## Prerequisites

You will need a [WorkOS account](https://dashboard.workos.com/signup).

## Running the example

1. Install dependencies with `npm install` or `yarn install`
2. Set up your **Environment variables** by signing into your [WorkOS dashboard](https://dashboard.workos.com), navigate to **API Keys** and copy the **Client ID** and the **Secret Key** (API Key).
   Rename the `.env.local.example` file to `.env.local` and supply your _Client ID_ and _Secret Key_.

   ```bash
   WORKOS_CLIENT_ID="<your Client ID>"
   WORKOS_API_KEY="<your Secret Key>"
   ```

3. Configure redirects in your [WorkOS dashboard](https://dashboard.workos.com), navigate to **Redirects** and add the following urls:

   ```bash
   http://localhost:3000/using-your-own-ui/sign-in/google-oauth/callback
   ```

   ```bash
   http://localhost:3000/using-your-own-ui/sign-in/microsoft-oauth/callback
   ```

   ```bash
   http://localhost:3000/using-your-own-ui/sign-in/github-oauth/callback
   ```

   ```bash
   http://localhost:3000/using-your-own-ui/sign-in/sso/callback
   ```

   ```bash
   http://localhost:3000/using-hosted-authkit/basic/callback
   ```

   ```bash
   http://localhost:3000/using-hosted-authkit/with-session/callback
   ```

   ```bash
   http://localhost:3000/using-hosted-authkit/with-nextjs/callback
   ```

4. Run the example with `npm run dev` or `yarn dev` and navigate to http://localhost:3000

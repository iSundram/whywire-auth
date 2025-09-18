import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

// Export the services you need
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };

// WhyWire specific configuration
export const config = {
  appwriteEndpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  appwriteProject: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id',
  appwriteDatabase: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  appwriteUserCollection: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
  
  // Domain configuration
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || process.env.NEXTAUTH_URL_DEV || 'http://localhost:3000',
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL || process.env.NEXT_PUBLIC_DASHBOARD_URL_DEV || 'http://localhost:3001',
  
  // OAuth redirect URLs for WhyWire
  getOAuthRedirectUrl: (provider: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_DOMAIN || process.env.NEXTAUTH_URL_DEV || 'http://localhost:3000';
    return `${baseUrl}/auth/callback/${provider}`;
  },
  
  // Success redirect after login
  getSuccessRedirectUrl: () => {
    return process.env.NEXT_PUBLIC_DASHBOARD_URL || process.env.NEXT_PUBLIC_DASHBOARD_URL_DEV || 'http://localhost:3001';
  },
  
  // Magic link redirect URL
  getMagicLinkUrl: () => {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_DOMAIN || process.env.NEXTAUTH_URL_DEV || 'http://localhost:3000';
    return `${baseUrl}/auth/magic-link`;
  },
  
  // Password reset URL
  getPasswordResetUrl: () => {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_DOMAIN || process.env.NEXTAUTH_URL_DEV || 'http://localhost:3000';
    return `${baseUrl}/auth/reset-password`;
  }
};
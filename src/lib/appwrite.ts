import { Client, Account, ID } from 'appwrite';

// Appwrite client configuration
export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize Appwrite services
export const account = new Account(client);

// Export ID utility for generating unique IDs
export { ID };

// Export types
export type { Models } from 'appwrite';
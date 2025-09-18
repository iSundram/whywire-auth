'use server';

// These are Next.js server actions.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle each request
// - adapt the code below in each of those endpoints
//
// Please also note that for the sake of simplicity, we return all errors here.
// In a real application, you should pay attention to which errors make it
// to the client for security reasons.

import { Client, Account } from 'appwrite';
import { ID } from 'appwrite';

// Initialize Appwrite client for server-side operations
function createAppwriteClient() {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

  return new Account(client);
}

export async function signUp(prevState: any, formData: FormData) {
  try {
    const account = createAppwriteClient();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const firstName = String(formData.get('firstName'));
    const lastName = String(formData.get('lastName'));
    const name = `${firstName} ${lastName}`.trim();

    // Create user with Appwrite
    const user = await account.create(ID.unique(), email, password, name);

    return { user };
  } catch (error: any) {
    return { 
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'An unknown error occurred',
        type: error.type || 'general'
      }
    };
  }
}

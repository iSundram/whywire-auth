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

// Initialize Appwrite client for server-side operations
function createAppwriteClient() {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

  return new Account(client);
}

export async function sendReset(prevState: any, formData: FormData) {
  try {
    const account = createAppwriteClient();
    const email = String(formData.get('email'));
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    // Send password recovery email
    const token = await account.createRecovery(
      email,
      `${baseUrl}/using-your-own-ui/reset-password`
    );

    return { token };
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

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    const account = createAppwriteClient();
    const userId = String(formData.get('userId'));
    const secret = String(formData.get('secret'));
    const newPassword = String(formData.get('newPassword'));

    // Reset password using the recovery token
    const token = await account.updateRecovery(userId, secret, newPassword);

    return { token };
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

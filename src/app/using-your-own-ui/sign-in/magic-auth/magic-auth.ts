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
import { cookies } from 'next/headers';

// Initialize Appwrite client for server-side operations
function createAppwriteClient() {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

  return new Account(client);
}

export async function sendCode(prevState: any, formData: FormData) {
  try {
    const account = createAppwriteClient();
    const email = String(formData.get('email'));
    
    // Create magic URL token
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const token = await account.createMagicURLToken(
      ID.unique(),
      email,
      `${baseUrl}/auth/magic-link`
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

export async function signIn(prevState: any, formData: FormData) {
  try {
    const account = createAppwriteClient();
    const userId = String(formData.get('userId'));
    const secret = String(formData.get('secret'));

    // Create session from magic URL
    const session = await account.createSession(userId, secret);
    
    // Store session in cookies
    cookies().set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    // Get user details
    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id')
      .setSession(session.secret);
      
    const userAccount = new Account(client);
    const user = await userAccount.get();

    return { user, session };
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

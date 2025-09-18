'use server';

import { Client, Account } from 'appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { config } from '@/lib/appwrite';

// Initialize Appwrite client for server-side operations
function createAppwriteClient() {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

  return new Account(client);
}

export async function signIn(prevState: any, formData: FormData) {
  try {
    const account = createAppwriteClient();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    // Create session with Appwrite
    const session = await account.createEmailPasswordSession(email, password);
    
    // Store session in cookies for cross-domain access
    cookies().set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.whywire.app' : undefined
    });

    // Get user details
    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id')
      .setSession(session.secret);
      
    const userAccount = new Account(client);
    const user = await userAccount.get();

    // Return success with redirect flag
    return { 
      user, 
      session,
      redirectTo: config.getSuccessRedirectUrl() // This will redirect to dashboard.whywire.app
    };
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

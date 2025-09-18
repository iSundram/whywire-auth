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
import { Models } from 'appwrite';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Initialize Appwrite client for server-side operations
function createAppwriteClient() {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

  // Get session from cookies
  const session = cookies().get('appwrite-session');
  if (session) {
    client.setSession(session.value);
  }

  return new Account(client);
}

export async function getUser(prevState: any, formData: FormData): Promise<Response> {
  try {
    const account = createAppwriteClient();
    
    // Get current user (Appwrite doesn't support listing users by email in client SDK)
    // In a real app, you might want to use the server SDK or store user data in a database
    const user = await account.get();
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

export async function updateUser(prevState: any, formData: FormData): Promise<Response> {
  try {
    const account = createAppwriteClient();
    const name = String(formData.get('name'));

    // Update user name
    const user = await account.updateName(name);
    
    revalidatePath('/users-table');
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

type Response = { user: Models.User<Models.Preferences> } | { error: any };

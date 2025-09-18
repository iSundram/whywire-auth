import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Client, Account } from 'appwrite';
import type { Models } from 'appwrite';

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

// Verify the session and return the user
export async function getUser(): Promise<{
  isAuthenticated: boolean;
  user?: Models.User<Models.Preferences> | null;
}> {
  try {
    const account = createAppwriteClient();
    const user = await account.get();
    
    return {
      isAuthenticated: true,
      user: user,
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

// Clear the session and redirect to the home page
export async function signOut() {
  try {
    const account = createAppwriteClient();
    await account.deleteSession('current');
  } catch (error) {
    // Continue with logout even if session deletion fails
  }
  
  // Clear the session cookie
  cookies().delete('appwrite-session');
  redirect('/using-hosted-authkit/with-session');
}

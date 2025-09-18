import { redirect } from 'next/navigation';
import { account } from '@/lib/appwrite';

// This is a Next.js Route Handler for Appwrite OAuth callback.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle the request
// - adapt the code below in your endpoint
//
// Please also note that for the sake of simplicity, we directly return the user here in the query string.
// In a real application, you would probably store the user in a token (JWT)
// and store that token in your DB or use cookies (See `with-session` example for more details).

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const secret = url.searchParams.get('secret');

  let response;

  if (!userId || !secret) {
    response = { error: 'Missing userId or secret' };
  } else {
    try {
      // Create a session with the OAuth secret
      const session = await account.createSession(userId, secret);
      
      // Get user information
      const user = await account.get();
      
      response = { user, session };
    } catch (error) {
      response = { error: error };
    }
  }

  if (response) {
    redirect(
      `http://localhost:3000/using-hosted-authkit/basic?response=${JSON.stringify(response)}`
    );
  }
}

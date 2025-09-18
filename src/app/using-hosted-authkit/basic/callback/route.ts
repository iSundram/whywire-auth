import { Client, Account } from 'appwrite';
import { redirect } from 'next/navigation';

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

  if (!userId || !secret) {
    redirect('/using-hosted-authkit/basic?error=missing_parameters');
    return;
  }

  let response;

  try {
    // Initialize Appwrite client
    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

    const account = new Account(client);
    
    // Create session from OAuth
    const session = await account.createSession(userId, secret);
    
    // Get user details
    client.setSession(session.secret);
    const userAccount = new Account(client);
    const user = await userAccount.get();

    response = { user, session };
  } catch (error) {
    response = error;
  }

  if (response) {
    redirect(
      `/using-hosted-authkit/basic?response=${encodeURIComponent(JSON.stringify(response))}`
    );
  }
}

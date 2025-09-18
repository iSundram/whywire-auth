import { Client, Account } from 'appwrite';
import { NextResponse } from 'next/server';

// This is a Next.js Route Handler for Appwrite OAuth callback with session management.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle the request
// - adapt the code below in your endpoint

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const secret = url.searchParams.get('secret');

  if (!userId || !secret) {
    url.pathname = '/using-hosted-authkit/with-session';
    url.searchParams.set('error', 'missing_parameters');
    return NextResponse.redirect(url);
  }

  try {
    // Initialize Appwrite client
    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

    const account = new Account(client);
    
    // Create session from OAuth
    const session = await account.createSession(userId, secret);

    // Cleanup params
    url.searchParams.delete('userId');
    url.searchParams.delete('secret');

    // Store the session and redirect to the application
    url.pathname = '/using-hosted-authkit/with-session';
    const response = NextResponse.redirect(url);

    response.cookies.set({
      name: 'appwrite-session',
      value: session.secret,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    url.pathname = '/using-hosted-authkit/with-session';
    url.searchParams.set('error', error.message || 'Authentication failed');
    return NextResponse.redirect(url);
  }
}

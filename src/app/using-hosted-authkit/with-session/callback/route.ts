import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { getJwtSecretKey } from '../auth';
import { account, client } from '@/lib/appwrite';

// This is a Next.js Route Handler for Appwrite OAuth callback.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle the request
// - adapt the code below in your endpoint

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const secret = url.searchParams.get('secret');

  if (!userId || !secret) {
    return NextResponse.json({ error: 'Missing userId or secret' }, { status: 400 });
  }

  try {
    // Create a session with the OAuth secret
    const session = await account.createSession(userId, secret);

    // Get user information
    const user = await account.get();

    // Create a JWT with the user's information
    const token = await new SignJWT({ user, session })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(getJwtSecretKey());

    // Cleanup params and redirect to the application
    const redirectUrl = new URL('/using-hosted-authkit/with-session', url.origin);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set({
      name: 'appwrite_session',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
  }
}

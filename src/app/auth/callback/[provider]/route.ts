import { Client, Account } from 'appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { config } from '@/lib/appwrite';

// Generic OAuth callback handler that redirects to dashboard.whywire.app
export async function GET(request: Request, { params }: { params: { provider: string } }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const secret = url.searchParams.get('secret');
  const provider = params.provider;

  if (!userId || !secret) {
    redirect(`${config.authDomain}/auth/error?error=missing_parameters&provider=${provider}`);
    return;
  }

  try {
    // Initialize Appwrite client
    const client = new Client();
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id';
    
    client
      .setEndpoint(endpoint)
      .setProject(project);

    const account = new Account(client);
    
    // Create session from OAuth
    const session = await account.createSession(userId, secret);
    
    // Store session in cookies
    cookies().set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.whywire.app' : undefined
    });

    // Redirect to WhyWire dashboard after successful authentication
    redirect(config.getSuccessRedirectUrl());
  } catch (error: any) {
    redirect(
      `${config.authDomain}/auth/error?error=${encodeURIComponent(error.message || 'Authentication failed')}&provider=${provider}`
    );
  }
}
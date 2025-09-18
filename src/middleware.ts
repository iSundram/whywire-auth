import { NextRequest, NextResponse } from 'next/server';
import { Client, Account } from 'appwrite';

// Initialize Appwrite client for server-side
function createAppwriteClient(request: NextRequest) {
  const client = new Client();
  
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || 'your-project-id');

  // Get session from cookies
  const session = request.cookies.get('appwrite-session');
  if (session) {
    client.setSession(session.value);
  }

  return new Account(client);
}

export async function middleware(request: NextRequest) {
  // Define protected routes
  const protectedPaths = [
    '/using-hosted-authkit/with-nextjs',
    '/using-your-own-ui/users-table',
    '/using-your-own-ui/update-user'
  ];

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  try {
    const account = createAppwriteClient(request);
    await account.get(); // This will throw if user is not authenticated
    return NextResponse.next();
  } catch (error) {
    // Redirect to sign-in page if not authenticated
    const signInUrl = new URL('/using-your-own-ui/sign-in/email-password', request.url);
    signInUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = { 
  matcher: [
    '/using-hosted-authkit/with-nextjs/:path*',
    '/using-your-own-ui/users-table/:path*',
    '/using-your-own-ui/update-user/:path*'
  ] 
};

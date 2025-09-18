// This middleware is disabled for the Appwrite integration
// For Appwrite authentication, you would typically handle auth checks in your page components
// or create custom middleware that checks Appwrite sessions

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // In a real implementation, you might check for Appwrite session cookies here
  return NextResponse.next();
}

// Disable middleware matching for now
export const config = { matcher: [] };

import { NextResponse } from 'next/server';

// This callback route is disabled for Appwrite integration
// Please use the basic or with-session examples for Appwrite OAuth flows

export async function GET(request: Request) {
  return NextResponse.redirect('http://localhost:3000/using-hosted-authkit/with-nextjs');
}

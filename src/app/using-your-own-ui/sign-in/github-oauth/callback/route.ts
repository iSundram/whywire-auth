// OAuth callback placeholder for Appwrite migration
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  // Placeholder for Appwrite OAuth callback
  redirect('http://localhost:3000/using-your-own-ui/sign-in/github-oauth?response=' + 
    JSON.stringify({ error: 'This example is disabled. Use /using-hosted-authkit/with-session for working Appwrite OAuth.' }));
}

import { WorkOS } from '@workos-inc/node';

// This example uses Next.js with React Server Components.
// Because this page is an RSC, the code stays on the server, which allows
// us to use the WorkOS Node SDK without exposing our API key to the client.
//
// If your application is a single page app (SPA), you will need to:
// - create a form that can POST to an endpoint in your backend
// - call the `getAuthorizationURL` method in that endpoint
// - redirect the user to the returned URL

const workos = new WorkOS(process.env.WORKOS_API_KEY);

'use client';

import { authService } from '@/lib/auth';

export default function MicrosoftOAuthPage() {
  const handleMicrosoftSignIn = () => {
    authService.createOAuth2Session('microsoft');
  };

  return (
    <div className="p-4">
      <h1>Microsoft OAuth Sign In</h1>
      <p>Sign in with your Microsoft account using Appwrite.</p>
      <button 
        onClick={handleMicrosoftSignIn}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with Microsoft
      </button>
      <div className="mt-4">
        <a href="/using-your-own-ui/sign-in/email-password" className="text-blue-600 hover:underline">
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

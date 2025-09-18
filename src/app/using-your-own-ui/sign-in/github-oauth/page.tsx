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

export default function GitHubOAuthPage() {
  const handleGitHubSignIn = () => {
    authService.createOAuth2Session('github');
  };

  return (
    <div className="p-4">
      <h1>GitHub OAuth Sign In</h1>
      <p>Sign in with your GitHub account using Appwrite.</p>
      <button 
        onClick={handleGitHubSignIn}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Sign in with GitHub
      </button>
      <div className="mt-4">
        <a href="/using-your-own-ui/sign-in/email-password" className="text-blue-600 hover:underline">
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

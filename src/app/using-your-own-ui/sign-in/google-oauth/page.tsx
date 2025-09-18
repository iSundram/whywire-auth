'use client';import { WorkOS } from '@workos-inc/node';



import { authService } from '@/lib/auth';// This example uses Next.js with React Server Components.

// Because this page is an RSC, the code stays on the server, which allows

export default function GoogleOAuthPage() {// us to use the WorkOS Node SDK without exposing our API key to the client.

  const handleGoogleSignIn = () => {//

    authService.createOAuth2Session('google');// If your application is a single page app (SPA), you will need to:

  };// - create a form that can POST to an endpoint in your backend

// - call the `getAuthorizationURL` method in that endpoint

  return (// - redirect the user to the returned URL

    <div className="p-4">

      <h1>Google OAuth Sign In</h1>const workos = new WorkOS(process.env.WORKOS_API_KEY);

      <p>Sign in with your Google account using Appwrite.</p>

      <button 'use client';

        onClick={handleGoogleSignIn}

        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"// Migrated to use Appwrite OAuth

      >import { authService } from '@/lib/auth';

        Sign in with Google

      </button>export default function GoogleOAuthPage() {

      <div className="mt-4">  const handleGoogleSignIn = () => {

        <a href="/using-your-own-ui/sign-in/email-password" className="text-blue-600 hover:underline">    authService.createOAuth2Session('google');

          Back to Sign In  };

        </a>

      </div>  return (

    </div>    <div className="p-4">

  );      <h1>Google OAuth Sign In</h1>

}      <p>Sign in with your Google account using Appwrite.</p>
      <button 
        onClick={handleGoogleSignIn}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
      <div className="mt-4">
        <a href="/using-your-own-ui/sign-in/email-password" className="text-blue-600 hover:underline">
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

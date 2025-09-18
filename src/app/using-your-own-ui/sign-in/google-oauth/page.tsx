'use client';

import { authService } from '@/lib/auth';

export default function GoogleOAuthPage() {
  const handleGoogleSignIn = () => {
    authService.createOAuth2Session('google');
  };

  return (
    <div className="p-4">
      <h1>Google OAuth Sign In</h1>
      <p>Sign in with your Google account using Appwrite.</p>
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

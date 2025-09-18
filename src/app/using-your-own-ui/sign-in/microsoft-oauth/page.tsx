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

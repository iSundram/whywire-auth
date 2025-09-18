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

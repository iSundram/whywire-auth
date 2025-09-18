'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function GitHubRedirect() {
  useEffect(() => {
    redirect('/using-your-own-ui/sign-in/github-oauth');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to GitHub sign in...</p>
      </div>
    </div>
  );
}
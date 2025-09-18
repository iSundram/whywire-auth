'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function MagicLinkRedirect() {
  useEffect(() => {
    redirect('/using-your-own-ui/sign-in/magic-auth');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to magic link sign in...</p>
      </div>
    </div>
  );
}
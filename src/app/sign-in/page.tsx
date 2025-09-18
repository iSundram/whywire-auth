'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInRedirect() {
  useEffect(() => {
    redirect('/using-your-own-ui/sign-in/email-password');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to sign in...</p>
      </div>
    </div>
  );
}
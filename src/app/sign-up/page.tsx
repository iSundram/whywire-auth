'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpRedirect() {
  useEffect(() => {
    redirect('/using-your-own-ui/sign-up/email-password');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to sign up...</p>
      </div>
    </div>
  );
}
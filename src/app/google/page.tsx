'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleRedirect() {
  useEffect(() => {
    redirect('/using-your-own-ui/sign-in/google-oauth');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to Google sign in...</p>
      </div>
    </div>
  );
}
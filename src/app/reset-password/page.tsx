'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ResetPasswordRedirect() {
  useEffect(() => {
    redirect('/using-your-own-ui/reset-password');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to reset password...</p>
      </div>
    </div>
  );
}
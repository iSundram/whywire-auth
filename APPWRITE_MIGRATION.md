# Appwrite Migration Guide

This guide helps developers implement the disabled authentication examples using Appwrite SDK.

## Overview

The following examples were disabled during the WorkOS → Appwrite migration and replaced with placeholders:
- Email/Password authentication
- Magic link authentication
- Multi-factor authentication (MFA)
- Password reset
- Email verification
- User management

## Working Examples

✅ **Google OAuth**: `/using-hosted-authkit/with-session`
✅ **Basic OAuth**: `/using-hosted-authkit/basic`

## Implementation Guides

### 1. Email/Password Authentication

Replace the placeholder in `src/app/using-your-own-ui/sign-in/email-password/email-password.ts`:

```typescript
'use server';

import { account } from '@/lib/appwrite';
import { redirect } from 'next/navigation';

export async function signIn(prevState: any, formData: FormData) {
  try {
    const session = await account.createEmailSession(
      String(formData.get('email')),
      String(formData.get('password'))
    );
    
    // Redirect to dashboard or handle success
    redirect('/dashboard');
  } catch (error) {
    return { error: error.message };
  }
}

export async function signUp(prevState: any, formData: FormData) {
  try {
    const user = await account.create(
      'unique()', // Let Appwrite generate ID
      String(formData.get('email')),
      String(formData.get('password')),
      String(formData.get('name'))
    );
    
    // Optionally create session immediately
    const session = await account.createEmailSession(
      String(formData.get('email')),
      String(formData.get('password'))
    );
    
    return { user, session };
  } catch (error) {
    return { error: error.message };
  }
}
```

### 2. Magic Link Authentication

```typescript
'use server';

import { account } from '@/lib/appwrite';

export async function sendMagicLink(prevState: any, formData: FormData) {
  try {
    const session = await account.createMagicURLSession(
      'unique()', // Session ID
      String(formData.get('email')),
      'https://your-app.com/auth/callback' // Callback URL
    );
    
    return { message: 'Magic link sent! Check your email.' };
  } catch (error) {
    return { error: error.message };
  }
}

export async function verifyMagicLink(userId: string, secret: string) {
  try {
    const session = await account.createSession(userId, secret);
    return { session };
  } catch (error) {
    return { error: error.message };
  }
}
```

### 3. Multi-Factor Authentication (MFA)

```typescript
'use server';

import { account } from '@/lib/appwrite';

export async function enableMFA(prevState: any, formData: FormData) {
  try {
    // Create MFA challenge
    const challenge = await account.createMfaChallenge('totp');
    
    return { 
      challenge,
      qrCode: challenge.qrCode, // QR code for authenticator app
      secret: challenge.secret
    };
  } catch (error) {
    return { error: error.message };
  }
}

export async function verifyMFA(prevState: any, formData: FormData) {
  try {
    const result = await account.updateMfaChallenge(
      String(formData.get('challengeId')),
      String(formData.get('otp'))
    );
    
    return { success: true, result };
  } catch (error) {
    return { error: error.message };
  }
}
```

### 4. Password Reset

```typescript
'use server';

import { account } from '@/lib/appwrite';

export async function sendPasswordReset(prevState: any, formData: FormData) {
  try {
    await account.createRecovery(
      String(formData.get('email')),
      'https://your-app.com/reset-password/confirm'
    );
    
    return { message: 'Password reset email sent!' };
  } catch (error) {
    return { error: error.message };
  }
}

export async function confirmPasswordReset(
  userId: string, 
  secret: string, 
  newPassword: string
) {
  try {
    await account.updateRecovery(userId, secret, newPassword, newPassword);
    return { message: 'Password updated successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}
```

### 5. Email Verification

```typescript
'use server';

import { account } from '@/lib/appwrite';

export async function sendVerification() {
  try {
    await account.createVerification(
      'https://your-app.com/verify-email'
    );
    
    return { message: 'Verification email sent!' };
  } catch (error) {
    return { error: error.message };
  }
}

export async function verifyEmail(userId: string, secret: string) {
  try {
    await account.updateVerification(userId, secret);
    return { message: 'Email verified successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}
```

### 6. User Management

```typescript
'use server';

import { account } from '@/lib/appwrite';

export async function updateUserProfile(prevState: any, formData: FormData) {
  try {
    // Update name
    if (formData.get('name')) {
      await account.updateName(String(formData.get('name')));
    }
    
    // Update email
    if (formData.get('email')) {
      await account.updateEmail(
        String(formData.get('email')),
        String(formData.get('password')) // Current password required
      );
    }
    
    // Update password
    if (formData.get('newPassword')) {
      await account.updatePassword(
        String(formData.get('newPassword')),
        String(formData.get('currentPassword'))
      );
    }
    
    const user = await account.get();
    return { user, message: 'Profile updated successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteAccount() {
  try {
    await account.deleteSession('current');
    // Note: Account deletion requires admin privileges
    // Use Appwrite Server SDK for this operation
    return { message: 'Account deleted successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}
```

## Client-Side Usage

For client-side authentication (useful for SPAs):

```typescript
'use client';

import { account } from '@/lib/appwrite';
import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      setUser(user);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
      return user;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    getCurrentUser
  };
}
```

## Error Handling

Common Appwrite errors and how to handle them:

```typescript
export function handleAppwriteError(error: any) {
  switch (error.code) {
    case 401:
      return 'Invalid credentials';
    case 429:
      return 'Too many requests. Please try again later.';
    case 400:
      return 'Invalid request. Please check your input.';
    default:
      return error.message || 'An unexpected error occurred';
  }
}
```

## Security Best Practices

1. **Environment Variables**: Always use environment variables for sensitive data
2. **HTTPS Only**: Ensure all production deployments use HTTPS
3. **CORS Configuration**: Properly configure allowed origins in Appwrite
4. **Rate Limiting**: Implement rate limiting for authentication endpoints
5. **Session Management**: Use secure, HTTP-only cookies for session storage

## Testing

Example test for authentication functions:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { signIn, signUp } from './email-password';

describe('Authentication', () => {
  beforeEach(() => {
    // Setup test environment
  });

  it('should sign in with valid credentials', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    const result = await signIn(null, formData);
    expect(result.session).toBeDefined();
  });

  it('should handle invalid credentials', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'wrongpassword');

    const result = await signIn(null, formData);
    expect(result.error).toBeDefined();
  });
});
```

## Resources

- [Appwrite Web SDK Documentation](https://appwrite.io/docs/references/cloud/client-web)
- [Appwrite Authentication Guide](https://appwrite.io/docs/products/auth)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
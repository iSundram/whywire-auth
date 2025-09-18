import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import type { Models } from 'appwrite';

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not set');
  }

  return new Uint8Array(Buffer.from(secret, 'base64'));
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

// Verify the JWT and return the user
export async function getUser(): Promise<{
  isAuthenticated: boolean;
  user?: Models.User<Models.Preferences> | null;
}> {
  const token = cookies().get('appwrite_session')?.value;

  if (token) {
    const verifiedToken = await verifyJwtToken(token);
    if (verifiedToken) {
      return {
        isAuthenticated: true,
        user: verifiedToken.user as Models.User<Models.Preferences> | null,
      };
    }
  }

  return { isAuthenticated: false };
}

// Clear the session and redirect to the home page
export async function signOut() {
  cookies().delete('appwrite_session');
  redirect('/using-hosted-authkit/with-session');
}

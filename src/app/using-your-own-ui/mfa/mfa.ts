'use server';

import { signIn as appwriteSignIn, verifyTotp as appwriteVerifyTotp } from '@/lib/appwrite-placeholders';

export const signIn = appwriteSignIn;
export const verifyTotp = appwriteVerifyTotp;

// Type placeholders for backwards compatibility
type AuthenticateResponse = { error?: any; user?: any };
type EnrollResponse = { authenticationFactor?: any; authenticationChallenge?: any };
type SignInResponse = AuthenticateResponse | {
  authenticationFactor?: EnrollResponse['authenticationFactor'];
  authenticationChallenge: EnrollResponse['authenticationChallenge'];
  pendingAuthenticationToken: string;
} | { error: any };

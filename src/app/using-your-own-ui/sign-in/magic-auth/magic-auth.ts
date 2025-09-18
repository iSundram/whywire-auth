'use server';

import { sendCode as appwriteSendCode, signIn as appwriteSignIn } from '@/lib/appwrite-placeholders';

export const sendCode = appwriteSendCode;
export const signIn = appwriteSignIn;

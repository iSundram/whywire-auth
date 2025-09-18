'use server';

import { sendCode as appwriteSendCode, verifyEmail as appwriteVerifyEmail } from '@/lib/appwrite-placeholders';

export const sendCode = appwriteSendCode;
export const verifyEmail = appwriteVerifyEmail;

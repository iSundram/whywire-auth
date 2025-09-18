'use server';

import { resetPassword as appwriteResetPassword } from '@/lib/appwrite-placeholders';

export async function sendReset(prevState: any, formData: FormData) {
  return { error: 'This example is disabled. Use /using-hosted-authkit/with-session for working Appwrite examples.' };
}

export const resetPassword = appwriteResetPassword;

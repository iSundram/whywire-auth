'use server';

import { updateUser as appwriteUpdateUser } from '@/lib/appwrite-placeholders';

export async function getUser(prevState: any, formData: FormData) {
  return { error: 'This example is disabled. Use /using-hosted-authkit/with-session for working Appwrite examples.' };
}

export const updateUser = appwriteUpdateUser;

type Response = { user?: any } | { error: any };

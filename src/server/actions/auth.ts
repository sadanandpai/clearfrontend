'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from '@/server/config/server.config';
import { createCookie, deleteCookie } from '@/server/utils/cookies';
import { validateEmailPassword, validateSignUp } from '@/server/utils/parser';
import {
  getSession,
  createSessionWithEmail,
  redirectToOAuth,
  destroySession,
  initiateSessionWithEmail,
  sendVerificationEmail,
} from '@/server/data-access/session';
import { GlobalResponse, respondWithError, respondWithSuccess } from '@/server/handlers/action';

export async function signInWithEmail(_prev: GlobalResponse, formData: FormData) {
  try {
    const { email, password } = validateEmailPassword(formData);
    const secret = await createSessionWithEmail(email, password);
    await createCookie(COOKIE_NAME, secret);
    return respondWithSuccess('Logged in successfully');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signInWithOAuth(provider: 'Google' | 'Github') {
  const reqHeaders = await headers();
  const origin = reqHeaders.get('origin');
  const redirectUrl = await redirectToOAuth(origin, provider);
  redirect(`${redirectUrl}&val=something`);
}

export async function signUpWithEmail(_prev: GlobalResponse, formData: FormData) {
  try {
    const { name, email, password } = validateSignUp(formData);
    const secret = await initiateSessionWithEmail(name, email, password);
    await createCookie(COOKIE_NAME, secret);
    await sendVerificationEmail();
    return respondWithSuccess('Signed up successfully');
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signOut() {
  await destroySession();
  await deleteCookie(COOKIE_NAME);
}

export async function getLoggedInUser() {
  try {
    return await getSession();
  } catch {
    return null;
  }
}

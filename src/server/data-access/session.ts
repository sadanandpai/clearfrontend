import 'server-only';

import { routes } from '@/common/routes';
import { HOST_URL } from '@/server/config/server.config';
import { getOAuthProvider, getUniqueID, oAuthProvidersType } from '@/server/services/appwrite';
import { serviceClient } from '../services/service_client';

export async function getSession() {
  const { account } = await serviceClient.user.authenticated();
  return await account.get();
}

export async function createSessionWithEmail(email: string, password: string) {
  const { account } = await serviceClient.user.admin();
  const session = await account.createEmailPasswordSession(email, password);
  return session.secret;
}

export async function createSessionWithSecret(userId: string, secret: string) {
  const { account } = await serviceClient.user.admin();
  const session = await account.createSession(userId, secret);
  return session.secret;
}

export async function redirectToOAuth(origin: string | null, provider: oAuthProvidersType) {
  const { account } = await serviceClient.user.admin();
  return await account.createOAuth2Token(
    getOAuthProvider(provider),
    `${origin}/oauth`,
    `${origin}/signin`,
  );
}

export async function initiateSessionWithEmail(name: string, email: string, password: string) {
  const { account } = await serviceClient.user.admin();
  await account.create(getUniqueID(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);
  return session.secret;
}

export async function sendVerificationEmail() {
  const { account } = await serviceClient.user.authenticated();
  await account.createVerification(`${HOST_URL}${routes.verifyEmail}`);
}

export async function destroySession() {
  const { account } = await serviceClient.user.authenticated();
  await account.deleteSession('current');
}

export async function updateSessionPassword(password: string, oldPassword: string) {
  const { account } = await serviceClient.user.authenticated();
  await account.updatePassword(password.toString(), oldPassword.toString());
}

export async function updateFullName(name: string) {
  const { account } = await serviceClient.user.authenticated();
  await account.updateName(name);
}

export async function updateUserEmail(email: string, password: string) {
  const { account } = await serviceClient.user.authenticated();
  await account.updateEmail(email, password);
}

export async function sendPasswordRecoveryEmail(email: string) {
  const { account } = await serviceClient.user.authenticated();
  await account.createRecovery(email, `${HOST_URL}${routes.resetPassword}`);
}

export async function resetPassword(userId: string, secret: string, password: string) {
  const { account } = await serviceClient.user.authenticated();
  await account.updateRecovery(userId, secret, password);
}

export async function updatePhoneNumber(phone: string, password: string) {
  const { account } = await serviceClient.user.authenticated();
  await account.updatePhone(phone, password);
}

export async function sendPhoneVerification() {
  const { account } = await serviceClient.user.authenticated();
  await account.createPhoneVerification();
}

export async function verifyPhoneNumber(otp: string) {
  const { account } = await serviceClient.user.authenticated();
  const session = await getSession();
  await account.updatePhoneVerification(session.$id, otp);
}

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import {
  createAdminClient,
  createSessionClient,
  getUniqueID,
} from "@/lib/server/baas/appwrite";

export async function signInWithEmailController(
  email: string,
  password: string
) {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);
  return session.secret;
}

export async function signInWithSecretController(
  userId: string,
  secret: string
) {
  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);
  return session.secret;
}

export async function signInWithOAuthController() {
  const { account } = await createAdminClient();
  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/signin`
  );

  return redirect(redirectUrl);
}

export async function signUpWithEmailController(
  name: string,
  email: string,
  password: string
) {
  const { account } = await createAdminClient();
  await account.create(getUniqueID(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);
  return session.secret;
}

export async function signOutController() {
  const { account } = await createSessionClient();
  await account.deleteSession("current");
}

export async function getLoggedInUserController() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}
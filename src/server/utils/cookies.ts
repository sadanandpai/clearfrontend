import { cookies } from "next/headers";

export async function getCookie(cookieName: string) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName);
}

export async function createCookie(cookieName: string, secret: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

export async function deleteCookie(cookieName: string) {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

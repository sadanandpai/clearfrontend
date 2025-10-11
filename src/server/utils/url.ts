import { headers } from "next/headers";

export async function getParams(param: string) {
  const reqHeaders = await headers();
  const referer = reqHeaders.get("referer");

  if (!referer) {
    return null;
  }

  const url = new URL(referer);
  const searchUrl = new URLSearchParams(url.search);
  return searchUrl.get(param);
}

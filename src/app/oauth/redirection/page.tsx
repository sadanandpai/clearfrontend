"use client";

import { routes } from "@/common/routes";

const localStorageKey = "redirect";
let isRedirecting = false;

export default function OAuthPage() {
  // Redirect to the profile after user is redirected back from the OAuth provider
  // The client side redirection is mandatory else cookies won't be set properly
  if (typeof window !== "undefined" && !isRedirecting) {
    const redirectURL = localStorage.getItem(localStorageKey);

    if (redirectURL) {
      localStorage.removeItem(localStorageKey);
      window.location.href = `${redirectURL}?auth=true`;
    } else {
      window.location.href = `${routes.profile}?auth=true`;
    }

    isRedirecting = true;
  }

  return <>Redirecting to the application...</>;
}

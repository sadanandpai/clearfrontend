"use client";

import { routes } from "@/common/routes";
import { useEffect } from 'react';

const LOCAL_STORAGE_KEY = "redirect";

export default function OAuthPage() {
  useEffect(() => {
    // Redirect to the profile after user is redirected back from the OAuth provider
    // The client side redirection is mandatory else cookies won't be set properly
    const redirectURL = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (redirectURL) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.location.href = `${redirectURL}?auth=true`;
    } else {
      window.location.href = `${routes.profile}?auth=true`;
    }
  }, []);

  return <>Redirecting to the application...</>;
}

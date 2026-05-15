"use client";

import { useEffect, useState } from "react";

/**
 * Listens to a CSS media query and re-renders when it changes.
 * Returns `false` on the server and the first client render to avoid hydration mismatches,
 * then settles to the real value after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();

    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
  }, [query]);

  return matches;
}

/**
 * Matches Tailwind's `md` breakpoint (>= 768px). Treats tablets-landscape and desktops as desktop.
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}

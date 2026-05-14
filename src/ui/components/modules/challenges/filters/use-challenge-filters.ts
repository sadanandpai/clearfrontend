"use client";

import type { ChallengeFilters } from "@/common/types/challenge.types";
import {
  areChallengeFiltersEqual,
  buildChallengeFiltersQueryString,
  parseFiltersFromSearchParams,
} from "./challenge-filter-url.utils";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useChallengeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ChallengeFilters>(() =>
    parseFiltersFromSearchParams(searchParams),
  );
  const filtersRef = useRef<ChallengeFilters>(parseFiltersFromSearchParams(searchParams));

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Back/forward and shared links: apply URL when it changes without matching local state
  useEffect(() => {
    const parsed = parseFiltersFromSearchParams(searchParams);
    startTransition(() => {
      setFilters((prev) => (areChallengeFiltersEqual(prev, parsed) ? prev : parsed));
    });
  }, [searchParams]);

  const syncUrl = useCallback(
    (merged: ChallengeFilters) => {
      const nextQuery = buildChallengeFiltersQueryString(merged);
      if (nextQuery === searchParams.toString()) {
        return;
      }
      queueMicrotask(() => {
        startTransition(() => {
          router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
        });
      });
    },
    [pathname, router, searchParams],
  );

  const updateFilters = useCallback(
    (newFilters: Partial<ChallengeFilters>) => {
      const prev = filtersRef.current;
      const merged: ChallengeFilters = { ...prev, ...newFilters };
      if (areChallengeFiltersEqual(merged, prev)) {
        return;
      }

      filtersRef.current = merged;
      setFilters(merged);
      syncUrl(merged);
    },
    [syncUrl],
  );

  const resetFilters = useCallback(() => {
    const cleared: ChallengeFilters = {
      difficulty: "All",
      tags: [],
      sortBy: "none",
      search: "",
    };
    filtersRef.current = cleared;
    setFilters(cleared);
    queueMicrotask(() => {
      startTransition(() => {
        router.replace(pathname, { scroll: false });
      });
    });
  }, [pathname, router]);

  return { filters, updateFilters, resetFilters };
};

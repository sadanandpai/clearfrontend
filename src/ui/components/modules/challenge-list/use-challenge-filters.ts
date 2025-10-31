"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ChallengeFilters, DifficultyFilter, SortOption } from "./challenge-list.types";

export const useChallengeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //Parse current filters from URL
  const filters: ChallengeFilters = useMemo(() => {
    const difficulty = (searchParams.get("difficulty") || "All") as DifficultyFilter;
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const sortBy = (searchParams.get("sort") || "none") as SortOption;
    const search = searchParams.get("search") || "";

    return { difficulty, tags, sortBy, search };
  }, [searchParams]);

  //Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<ChallengeFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      const merged = { ...filters, ...newFilters };

      // Update or remove params
      if (merged.difficulty !== "All") {
        params.set("difficulty", merged.difficulty);
      } else {
        params.delete("difficulty");
      }

      if (merged.tags.length > 0) {
        params.set("tags", merged.tags.join(","));
      } else {
        params.delete("tags");
      }

      if (merged.sortBy !== "none") {
        params.set("sort", merged.sortBy);
      } else {
        params.delete("sort");
      }

      if (merged.search.trim()) {
        params.set("search", merged.search);
      } else {
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [filters, pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, updateFilters, resetFilters };
};

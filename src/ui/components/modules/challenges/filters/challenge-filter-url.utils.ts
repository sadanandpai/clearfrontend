import type {
  ChallengeFilters,
  DifficultyFilter,
  SortOption,
} from "@/common/types/challenge.types";

/** Minimal shape compatible with `URLSearchParams` / `ReadonlyURLSearchParams`. */
export type SearchParamsLike = { get: (name: string) => string | null };

export function parseFiltersFromSearchParams(sp: SearchParamsLike): ChallengeFilters {
  return {
    difficulty: (sp.get("difficulty") || "All") as DifficultyFilter,
    tags: sp.get("tags")?.split(",").filter(Boolean) || [],
    sortBy: (sp.get("sort") || "none") as SortOption,
    search: sp.get("search") || "",
  };
}

function tagsEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((t, i) => t === sb[i]);
}

export function areChallengeFiltersEqual(a: ChallengeFilters, b: ChallengeFilters) {
  return (
    a.difficulty === b.difficulty &&
    a.sortBy === b.sortBy &&
    a.search === b.search &&
    tagsEqual(a.tags, b.tags)
  );
}

export function buildChallengeFiltersQueryString(merged: ChallengeFilters): string {
  const params = new URLSearchParams();
  if (merged.difficulty !== "All") {
    params.set("difficulty", merged.difficulty);
  }
  if (merged.tags.length > 0) {
    params.set("tags", merged.tags.join(","));
  }
  if (merged.sortBy !== "none") {
    params.set("sort", merged.sortBy);
  }
  if (merged.search.trim()) {
    params.set("search", merged.search.trim());
  }
  return params.toString();
}

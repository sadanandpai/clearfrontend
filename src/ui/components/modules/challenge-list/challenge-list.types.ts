export interface Challenges {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";
export type SortOption =
  | "none"
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "difficulty-asc"
  | "difficulty-desc";

export interface ChallengeFilters {
  difficulty: DifficultyFilter;
  tags: string[];
  sortBy: SortOption;
  search: string;
}

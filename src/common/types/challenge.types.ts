export interface Challenge {
  id: number;
  name: string;
  difficulty: Difficulty;
  tags: string[];
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export type DifficultyFilter = "All" | Difficulty.Easy | Difficulty.Medium | Difficulty.Hard;

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

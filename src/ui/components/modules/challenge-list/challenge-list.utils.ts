import { Challenges, ChallengeFilters } from "./challenge-list.types";

export const filterChallenges = (challenges: Challenges[], searchQuery: string) => {
  if (!searchQuery.trim()) return challenges;
  const query = searchQuery.trim().toLowerCase();
  return challenges.filter((challenge) => {
    return (
      challenge.name.toLowerCase().includes(query) ||
      challenge.difficulty.toLowerCase().includes(query) ||
      challenge.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
};

export const getAllUniqueTags = (challenges: Challenges[]): string[] => {
  const tagsSet = new Set<string>();
  challenges.forEach((challenge) => {
    challenge.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const filterAndSortChallenges = (
  challenges: Challenges[],
  filters: ChallengeFilters,
): Challenges[] => {
  let result = [...challenges];

  //1. Filter by search query
  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter((challenge) => {
      return (
        challenge.name.toLowerCase().includes(query) ||
        challenge.difficulty.toLowerCase().includes(query) ||
        challenge.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }

  //2. Filter by difficulty
  if (filters.difficulty != "All") {
    result = result.filter((c) => c.difficulty === filters.difficulty);
  }

  //3. Filter by tags (AND logic - challenge must have all selected tags)
  if (filters.tags.length > 0) {
    result = result.filter((c) => filters.tags.every((tag: string) => c.tags.includes(tag)));
  }

  //4. Sort
  switch (filters.sortBy) {
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "difficulty-asc":
      result.sort((a, b) => difficultyWeight(a.difficulty) - difficultyWeight(b.difficulty));
      break;
    case "difficulty-desc":
      result.sort((a, b) => difficultyWeight(b.difficulty) - difficultyWeight(a.difficulty));
      break;
    case "newest":
      result.sort((a, b) => b.id - a.id);
      break;
    case "oldest":
      result.sort((a, b) => a.id - b.id);
      break;
  }
  return result;
};

const difficultyWeight = (difficulty: string): number => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
    default:
      return 0;
  }
};

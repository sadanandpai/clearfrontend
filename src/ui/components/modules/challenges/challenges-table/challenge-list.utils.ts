import { Challenge, ChallengeFilters, Difficulty } from "@/common/types/challenge.types";

export const filterChallenges = (challenges: Challenge[], searchQuery: string) => {
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

export const getUniqueTags = (
  challenges: Challenge[],
  minCount = 3,
): { tag: string; count: number }[] => {
  const tagsMap = new Map<string, number>();
  challenges.forEach((challenge) => {
    challenge.tags.forEach((tag) => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagsMap.entries())
    .filter(([_, count]) => count >= minCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
};

export const filterAndSortChallenges = (
  challenges: Challenge[],
  filters: ChallengeFilters,
): Challenge[] => {
  let result = [...filterChallenges(challenges, filters.search)];

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
    case "none":
      // Keep original order (no sorting)
      break;
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
    case Difficulty.Easy:
      return 1;
    case Difficulty.Medium:
      return 2;
    case Difficulty.Hard:
      return 3;
    default:
      return 0;
  }
};

export const getDifficultyCounts = (challenges: Challenge[]) => {
  const counts = {
    All: challenges.length,
    [Difficulty.Easy]: 0,
    [Difficulty.Medium]: 0,
    [Difficulty.Hard]: 0,
  };

  challenges.forEach((challenge) => {
    if (challenge.difficulty === Difficulty.Easy) counts[Difficulty.Easy]++;
    else if (challenge.difficulty === Difficulty.Medium) counts[Difficulty.Medium]++;
    else if (challenge.difficulty === Difficulty.Hard) counts[Difficulty.Hard]++;
  });

  return counts;
};

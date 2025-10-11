import { Challenges } from "./challenge-list.types";

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

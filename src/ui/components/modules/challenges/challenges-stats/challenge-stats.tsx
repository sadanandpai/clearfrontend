"use client";

import { Challenge, Difficulty } from "@/common/types/challenge.types";

import { DifficultyStatCard } from "./difficulty-stat-card";
import { Flex } from "@radix-ui/themes";

interface Props {
  challenges: Challenge[];
  solvedChallengeIds?: number[];
}

export const ChallengeStats = ({ challenges, solvedChallengeIds = [] }: Props) => {
  const getDifficultyStats = (difficulty: Difficulty) => {
    const { total, solved } = challenges.reduce(
      (acc, challenge) => {
        if (challenge.difficulty === difficulty) {
          acc.total += 1;
          if (solvedChallengeIds.includes(challenge.id)) {
            acc.solved += 1;
          }
        }
        return acc;
      },
      { total: 0, solved: 0 },
    );
    return { solved, total, percentage: total > 0 ? (solved / total) * 100 : 0 };
  };

  const difficultyStats = [
    { difficulty: Difficulty.Easy, ...getDifficultyStats(Difficulty.Easy) },
    { difficulty: Difficulty.Medium, ...getDifficultyStats(Difficulty.Medium) },
    { difficulty: Difficulty.Hard, ...getDifficultyStats(Difficulty.Hard) },
  ];

  return (
    <Flex gap="3" className="my-6 px-4">
      {difficultyStats.map((stat) => (
        <DifficultyStatCard
          key={stat.difficulty}
          difficulty={stat.difficulty}
          solved={stat.solved}
          total={stat.total}
          percentage={stat.percentage}
        />
      ))}
    </Flex>
  );
};

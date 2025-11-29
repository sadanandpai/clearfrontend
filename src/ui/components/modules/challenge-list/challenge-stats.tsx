"use client";

import { Flex } from "@radix-ui/themes";
import { Challenges } from "./challenge-list.types";
import { DifficultyStatCard } from "./difficulty-stat-card";

interface Props {
  challenges: Challenges[];
  solvedChallengeIds?: number[]
}

export const ChallengeStats = ({ challenges, solvedChallengeIds = [] }: Props) => {
  const getDifficultyStats = (difficulty: "Easy" | "Medium" | "Hard") => {
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
      { total: 0, solved: 0 }
    );
    return { solved, total, percentage: total > 0 ? (solved / total) * 100 : 0 };
  };

  const difficultyStats = [
    { difficulty: "Easy" as const, ...getDifficultyStats("Easy") },
    { difficulty: "Medium" as const, ...getDifficultyStats("Medium") },
    { difficulty: "Hard" as const, ...getDifficultyStats("Hard") },
  ];

  return (
    <Flex gap="3" style={{ margin: "24px 0", padding: "0 16px" }}>
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
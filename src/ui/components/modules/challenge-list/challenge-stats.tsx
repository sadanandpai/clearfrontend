"use client";

import { Card, Flex, Text, Progress } from "@radix-ui/themes";
import { Challenges } from "./challenge-list.types";

interface Props {
  challenges: Challenges[];
  solvedChallengeIds?: number[];
}

export const ChallengeStats = ({ challenges, solvedChallengeIds = [] }: Props) => {
  const getDifficultyStats = (difficulty: "Easy" | "Medium" | "Hard") => {
    const total = challenges.filter((c) => c.difficulty === difficulty).length;
    const solved = challenges
      .filter((c) => c.difficulty === difficulty && solvedChallengeIds.includes(c.id))
      .length;
    return { solved, total, percentage: total > 0 ? (solved / total) * 100 : 0 };
  };

  const easyStats = getDifficultyStats("Easy");
  const mediumStats = getDifficultyStats("Medium");
  const hardStats = getDifficultyStats("Hard");

  const getDifficultyColor = (difficulty: "Easy" | "Medium" | "Hard") => {
    switch (difficulty) {
      case "Easy":
        return "green";
      case "Medium":
        return "yellow";
      case "Hard":
        return "red";
    }
  };

  return (
  <Flex gap="3" style={{ flex: 1 }}>
    {/* Easy */}
    <Card style={{ padding: "16px", flex: 1 }}>
      <Flex direction="column" gap="2">
        <Text size="2" weight="medium" color="green">
          Easy
        </Text>
        <Text size="5" weight="bold">
          {easyStats.solved}/{easyStats.total}
        </Text>
        <Progress
          value={easyStats.percentage}
          color={getDifficultyColor("Easy")}
          size="2"
        />
      </Flex>
    </Card>

    {/* Medium */}
    <Card style={{ padding: "16px", flex: 1 }}>
      <Flex direction="column" gap="2">
        <Text size="2" weight="medium" color="yellow">
          Medium
        </Text>
        <Text size="5" weight="bold">
          {mediumStats.solved}/{mediumStats.total}
        </Text>
        <Progress
          value={mediumStats.percentage}
          color={getDifficultyColor("Medium")}
          size="2"
        />
      </Flex>
    </Card>

    {/* Hard */}
    <Card style={{ padding: "16px", flex: 1 }}>
      <Flex direction="column" gap="2">
        <Text size="2" weight="medium" color="red">
          Hard
        </Text>
        <Text size="5" weight="bold">
          {hardStats.solved}/{hardStats.total}
        </Text>
        <Progress
          value={hardStats.percentage}
          color={getDifficultyColor("Hard")}
          size="2"
        />
      </Flex>
    </Card>
  </Flex>
  );
};
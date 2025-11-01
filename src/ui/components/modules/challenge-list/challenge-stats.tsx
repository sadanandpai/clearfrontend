"use client";

import { Card, Flex, Text, Progress } from "@radix-ui/themes";
import { Challenges } from "./challenge-list.types";

interface Props {
  challenges: Challenges[];
}

export const ChallengeStats = ({ challenges }: Props) => {
  const getDifficultyStats = (difficulty: "Easy" | "Medium" | "Hard") => {
    const total = challenges.filter((c) => c.difficulty === difficulty).length;
    const solved = 0; // TODO: Replace with actual solved count when user progress tracking is implemented
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
    <Flex gap="3" style={{ margin: "24px 0", padding: "0 16px" }}>
      {/* Easy */}
      <Card style={{ padding: 16, flex: 1 }}>
        <Flex direction="column" gap="2">
          <Flex justify="between" align="center">
            <Text size="2" weight="medium" color="green">
              Easy
            </Text>
            <Text size="2" weight="bold">
              {easyStats.solved}/{easyStats.total}
            </Text>
          </Flex>
          <Progress
            value={easyStats.percentage}
            color={getDifficultyColor("Easy")}
            size="1"
          />
        </Flex>
      </Card>

      {/* Medium */}
      <Card style={{ padding: 16, flex: 1 }}>
        <Flex direction="column" gap="2">
          <Flex justify="between" align="center">
            <Text size="2" weight="medium" color="yellow">
              Medium
            </Text>
            <Text size="2" weight="bold">
              {mediumStats.solved}/{mediumStats.total}
            </Text>
          </Flex>
          <Progress
            value={mediumStats.percentage}
            color={getDifficultyColor("Medium")}
            size="1"
          />
        </Flex>
      </Card>

      {/* Hard */}
      <Card style={{ padding: 16, flex: 1 }}>
        <Flex direction="column" gap="2">
          <Flex justify="between" align="center">
            <Text size="2" weight="medium" color="red">
              Hard
            </Text>
            <Text size="2" weight="bold">
              {hardStats.solved}/{hardStats.total}
            </Text>
          </Flex>
          <Progress
            value={hardStats.percentage}
            color={getDifficultyColor("Hard")}
            size="1"
          />
        </Flex>
      </Card>
    </Flex>
  );
};
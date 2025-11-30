import { Card, Flex, Progress, Text } from "@radix-ui/themes";

import { Difficulty } from "@/common/types/challenge.types";
import { getDifficultyColor } from "@/ui/utils/challenge";

interface Props {
  difficulty: Difficulty;
  solved: number;
  total: number;
  percentage: number;
}

export const DifficultyStatCard = ({ difficulty, solved, total, percentage }: Props) => {
  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Flex direction="column" gap="2">
        <Flex justify="between" align="center">
          <Text
            size="2"
            weight="medium"
            color={getDifficultyColor(difficulty)}
            className="capitalize"
          >
            {difficulty}
          </Text>
          <Text size="2" weight="bold">
            {solved}/{total}
          </Text>
        </Flex>
        <Progress value={percentage} color={getDifficultyColor(difficulty)} size="1" />
      </Flex>
    </Card>
  );
};

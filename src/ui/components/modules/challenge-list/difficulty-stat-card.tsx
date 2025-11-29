import { Card, Flex, Text, Progress } from "@radix-ui/themes";
import { getDifficultyColor } from "@/ui/utils/challenge";

interface Props {
  difficulty: "Easy" | "Medium" | "Hard";
  solved: number;
  total: number;
  percentage: number;
}

export const DifficultyStatCard = ({ difficulty, solved, total, percentage }: Props) => {
  return (
    <Card style={{ padding: "1rem", flex: 1 }}>
      <Flex direction="column" gap="1">
        <Text size="2" weight="medium" color={getDifficultyColor(difficulty)}>
          {difficulty}
        </Text>
        <Text size="4" weight="bold">
          {solved}/{total}
        </Text>
        <Progress value={percentage} color={getDifficultyColor(difficulty)} size="1" />
      </Flex>
    </Card>
  );
};

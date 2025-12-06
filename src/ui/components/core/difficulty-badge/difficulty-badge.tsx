import { Badge } from "@radix-ui/themes";
import { Difficulty } from "@/common/types/challenge.types";

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const difficultyColor =
    difficulty === Difficulty.Easy ? "green" : difficulty === Difficulty.Medium ? "yellow" : "red";

  return (
    <Badge color={difficultyColor} variant="soft" size="3" className="capitalize">
      {difficulty}
    </Badge>
  );
}

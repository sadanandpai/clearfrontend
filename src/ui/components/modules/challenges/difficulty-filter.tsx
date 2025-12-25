"use client";

import { Button, Flex } from "@radix-ui/themes";
import {
  Difficulty,
  DifficultyFilter as DifficultyFilterType,
} from "@/common/types/challenge.types";

interface Props {
  selected: DifficultyFilterType;
  onChange: (difficulty: DifficultyFilterType) => void;
  counts?: {
    All: number;
    [Difficulty.Easy]: number;
    [Difficulty.Medium]: number;
    [Difficulty.Hard]: number;
  };
}

const difficulties: DifficultyFilterType[] = [
  "All",
  Difficulty.Easy,
  Difficulty.Medium,
  Difficulty.Hard,
];

export const DifficultyFilter = ({ selected, onChange, counts }: Props) => {
  return (
    <Flex gap="2" wrap="wrap">
      <span className="font-semibold mr-2">Difficulty:</span>
      {difficulties.map((diff) => (
        <Button
          key={diff}
          variant={selected === diff ? "solid" : "soft"}
          size="2"
          onClick={() => onChange(diff)}
          className="cursor-pointer"
        >
          {diff.toUpperCase()}
          {counts && <span className="ml-1 opacity-70">({counts[diff]})</span>}
        </Button>
      ))}
    </Flex>
  );
};

"use client";

import { Button, Flex } from "@radix-ui/themes";
import { DifficultyFilter as DifficultyFilterType } from "./challenge-list.types";

interface Props {
  selected: DifficultyFilterType;
  onChange: (difficulty: DifficultyFilterType) => void;
  counts?: {
    All: number;
    Easy: number;
    Medium: number;
    Hard: number;
  }
}

const difficulties: DifficultyFilterType[] = ["All", "Easy", "Medium", "Hard"];

export const DifficultyFilter = ({ selected, onChange, counts }: Props) => {
  return (
    <Flex gap="2" wrap="wrap">
      <span style={{ fontWeight: 600, marginRight: 8 }}>Difficulty:</span>
      {difficulties.map((diff) => (
        <Button
          key={diff}
          variant={selected === diff ? "solid" : "soft"}
          size="2"
          onClick={() => onChange(diff)}
          style={{ cursor: "pointer" }}
        >
          {diff}
          {counts && <span style={{ marginLeft: 4, opacity: 0.7 }}>({counts[diff]})</span>}
        </Button>
      ))}
    </Flex>
  );
};

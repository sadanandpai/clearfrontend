"use client";

import { Button } from "@radix-ui/themes";
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
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-2">
      <span className="font-semibold md:mr-2">
        Difficulty<span className="hidden md:inline">:</span>
      </span>
      <div className="grid grid-cols-2 gap-2 md:contents">
        {difficulties.map((diff) => (
          <Button
            key={diff}
            variant={selected === diff ? "solid" : "soft"}
            size="2"
            onClick={() => onChange(diff)}
            className="cursor-pointer w-full md:w-auto"
          >
            {diff === "All" ? "All" : <span className="capitalize">{diff}</span>}
            {counts && <span className="ml-1 opacity-70">({counts[diff]})</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

import { Challenge, Difficulty } from "@/common/types/challenge.types";

export const challenges: Challenge[] = [
  {
    id: 1,
    name: "Two Sum",
    difficulty: Difficulty.Easy,
    tags: ["Math", "Number"],
  },
  {
    id: 2,
    name: "Zip",
    difficulty: Difficulty.Medium,
    tags: ["Array", "Loop"],
  },
  {
    id: 3,
    name: "Random Number",
    difficulty: Difficulty.Hard,
    tags: ["Math", "Number"],
  },
];

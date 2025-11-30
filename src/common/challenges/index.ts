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
    difficulty: Difficulty.Easy,
    tags: ["Math", "Number"],
  },
  {
    id: 4,
    name: "Palindrome Check",
    difficulty: Difficulty.Easy,
    tags: ["String", "Algorithm"],
  },
  {
    id: 5,
    name: "Valid Parentheses",
    difficulty: Difficulty.Medium,
    tags: ["String", "Stack"],
  },
];

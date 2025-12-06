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
  {
    id: 6,
    name: "Function Call Limiter",
    difficulty: Difficulty.Medium,
    tags: ["Function", "Closure"],
  },
  {
    id: 7,
    name: "Array Chunking",
    difficulty: Difficulty.Medium,
    tags: ["Array", "Algorithm"],
  },
  {
    id: 8,
    name: "Implement Basic Debounce()",
    difficulty: Difficulty.Medium,
    tags: ["Function", "Closure", "Timing"],
  },
];

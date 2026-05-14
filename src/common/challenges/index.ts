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
  {
    id: 9,
    name: "Rolling transcript buffer",
    difficulty: Difficulty.Medium,
    tags: ["Strings", "Subtraction"],
  },
  {
    id: 10,
    name: "Reverse Bits (32-bit)",
    difficulty: Difficulty.Easy,
    tags: ["Bit Manipulation", "Number"],
  },
  {
    id: 11,
    name: "Merge Two Sorted Lists",
    difficulty: Difficulty.Easy,
    tags: ["Array", "Two Pointers"],
  },
  {
    id: 12,
    name: "Top K Frequent Elements",
    difficulty: Difficulty.Medium,
    tags: ["Array", "Hash Map", "Bucket"],
  },
  {
    id: 13,
    name: "Remove Duplicates from Sorted Array",
    difficulty: Difficulty.Easy,
    tags: ["Array", "Two Pointers"],
  },
  {
    id: 14,
    name: "Find First Occurrence in a String",
    difficulty: Difficulty.Easy,
    tags: ["String", "Search"],
  },
  {
    id: 15,
    name: "Minimum Window Substring",
    difficulty: Difficulty.Hard,
    tags: ["String", "Sliding Window", "Hash Map"],
  },
];

import { Difficulty } from "@/common/types/challenge.types";

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "green";
    case Difficulty.Medium:
      return "yellow";
    case Difficulty.Hard:
      return "red";
  }
};

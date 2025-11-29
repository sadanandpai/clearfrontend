export const getDifficultyColor = (difficulty: "Easy" | "Medium" | "Hard") => {
  switch (difficulty) {
    case "Easy":
      return "green";
    case "Medium":
      return "yellow";
    case "Hard":
      return "red";
  }
};

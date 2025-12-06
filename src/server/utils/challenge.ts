import { challenges } from "@/common/challenges";

export function isValidChallengeId(challengeId: number) {
  return typeof challengeId === "number" && 0 < challengeId && challengeId <= challenges.length;
}

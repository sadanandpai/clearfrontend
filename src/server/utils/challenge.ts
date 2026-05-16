import { challenges } from "@/common/challenges";

export function isValidChallengeId(challengeId: number) {
  return typeof challengeId === "number" && 0 < challengeId && challengeId <= challenges.length;
}

export function safeCount(val?: unknown): number {
  const n = Number(val);
  return isNaN(n) || n < 0 ? 0 : Math.floor(n);
}

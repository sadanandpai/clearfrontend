"use server";

import { incrementAttempts, getStats } from "@/server/data-access/activities";
import { isValidChallengeId } from "@/server/utils/challenge";

export async function incrementChallengeAttempts(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await incrementAttempts(challengeId);
}

export async function getChallengeActivity(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return getStats(challengeId);
}

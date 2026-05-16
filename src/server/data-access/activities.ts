import "server-only";

import { serviceClient } from "@/server/services/service_client";
import { safeCount } from "@/server/utils/challenge";

export async function getStats(challengeId: number) {
  const keys = [
    `views:${challengeId}`,
    `likes:${challengeId}`,
    `attempts:${challengeId}`,
    `solves:${challengeId}`,
  ];

  const [views, likes, attempts, solves] = await serviceClient.cache().mget(keys);

  return {
    views: safeCount(views),
    likes: safeCount(likes),
    attempts: safeCount(attempts),
    solves: safeCount(solves),
  };
}

export async function incrementViews(challengeId: number) {
  await serviceClient.cache().incr(`views:${challengeId}`);
}

export async function incrementAttempts(challengeId: number) {
  await serviceClient.cache().incr(`attempts:${challengeId}`);
}

export async function incrementSolves(challengeId: number) {
  await serviceClient.cache().incr(`solves:${challengeId}`);
}

export async function updateLikes(challengeId: number, isIncrement: boolean) {
  const key = `likes:${challengeId}`;

  if (isIncrement) {
    return await serviceClient.cache().incr(key);
  } else {
    const current = (await serviceClient.cache().get<number>(key)) || 0;
    if (current > 0) {
      return await serviceClient.cache().decr(key);
    }
    return 0;
  }
}

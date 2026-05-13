import "server-only";

import { serviceClient } from "../services/service_client";
import { getStatsFromDB, incrementStatInDB, decrementStatInDB } from "./challenge-stats";
import { safeCount, getFromCacheOrDB, ensureCacheSeeded } from "@/server/utils/cache";

export async function getViews(challengeId: number) {
  return safeCount(await serviceClient.cache().get(`views:${challengeId}`));
}

export async function getAttempts(challengeId: number) {
  return safeCount(await serviceClient.cache().get(`attempts:${challengeId}`));
}

export async function incrementViews(challengeId: number) {
  await serviceClient.cache().incr(`views:${challengeId}`);
}

export async function incrementAttempts(challengeId: number) {
  await serviceClient.cache().incr(`attempts:${challengeId}`);
}

export async function getLikes(challengeId: number) {
  return getFromCacheOrDB(`likes:${challengeId}`, () =>
    getStatsFromDB(challengeId).then((s) => s.likes),
  );
}

export async function getSolves(challengeId: number) {
  return getFromCacheOrDB(`solves:${challengeId}`, () =>
    getStatsFromDB(challengeId).then((s) => s.solves),
  );
}

export async function incrementSolves(challengeId: number) {
  const key = `solves:${challengeId}`;
  await ensureCacheSeeded(key, () => getStatsFromDB(challengeId).then((s) => s.solves));
  await serviceClient.cache().incr(key);
  incrementStatInDB(challengeId, "solves").catch(() => { });
}

export async function updateLikes(challengeId: number, isIncrement: boolean) {
  const redis = serviceClient.cache();
  const key = `likes:${challengeId}`;

  await ensureCacheSeeded(key, () => getStatsFromDB(challengeId).then((s) => s.likes));

  if (isIncrement) {
    await redis.incr(key);
    incrementStatInDB(challengeId, "likes").catch(() => { });
  } else {
    const newVal = await redis.decr(key);
    if (newVal < 0) await redis.set(key, 0);
    decrementStatInDB(challengeId, "likes").catch(() => { });
  }
}

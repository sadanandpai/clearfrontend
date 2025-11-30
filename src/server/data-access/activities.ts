import "server-only";
import { serviceClient } from "../services/service_client";
import { countChallengeLikes, countChallengeAttempts, countChallengeSolves } from "./challenge";

export async function getViews(challengeId: number) {
  const raw = await serviceClient.cache().get(`views:${challengeId}`);
  const val = Number(raw);
  return Number.isNaN(val) ? 0 : val;
}

export async function getLikes(challengeId: number) {
  const cached = await serviceClient.cache().get(`likes:${challengeId}`);
  const cachedNum = Number(cached);
  if (!Number.isNaN(cachedNum)) return cachedNum;
  const dbCount = await countChallengeLikes(challengeId);
  await serviceClient.cache().set(`likes:${challengeId}`, dbCount);
  return dbCount;
}

export async function getAttempts(challengeId: number) {
  const raw = await serviceClient.cache().get(`attempts:${challengeId}`);
  let val = Number(raw);
  if (Number.isNaN(val)) {
    val = await countChallengeAttempts(challengeId);
    await serviceClient.cache().set(`attempts:${challengeId}`, val);
  }
  return val;
}

export async function getSolves(challengeId: number) {
  const raw = await serviceClient.cache().get(`solves:${challengeId}`);
  let val = Number(raw);
  if (Number.isNaN(val)) {
    val = await countChallengeSolves(challengeId);
    await serviceClient.cache().set(`solves:${challengeId}`, val);
  }
  return val;
}

export async function incrementViews(challengeId: number) {
  const key = `views:${challengeId}`;
  let current = Number(await serviceClient.cache().get(key));
  if (Number.isNaN(current)) {
    current = 0;
    await serviceClient.cache().set(key, current);
  }
  await serviceClient.cache().incr(key);
}

export async function incrementAttempts(challengeId: number) {
  const key = `attempts:${challengeId}`;
  let current = Number(await serviceClient.cache().get(key));
  if (Number.isNaN(current)) {
    current = await countChallengeAttempts(challengeId);
    await serviceClient.cache().set(key, current);
  }
  await serviceClient.cache().incr(key);
}

export async function incrementSolves(challengeId: number) {
  const key = `solves:${challengeId}`;
  let current = Number(await serviceClient.cache().get(key));
  if (Number.isNaN(current)) {
    current = await countChallengeSolves(challengeId);
    await serviceClient.cache().set(key, current);
  }
  await serviceClient.cache().incr(key);
}

export async function updateLikes(challengeId: number, isIncrement: boolean) {
  const key = `likes:${challengeId}`;
  let current = Number(await serviceClient.cache().get(key));
  if (Number.isNaN(current)) {
    current = await countChallengeLikes(challengeId);
    await serviceClient.cache().set(key, current);
  }

  if (isIncrement) {
    await serviceClient.cache().incr(key);
    return;
  }

  if (current > 0) {
    await serviceClient.cache().decr(key);
  } else {
    await serviceClient.cache().set(key, 0);
  }
}

import "server-only";
import { serviceClient } from "../services/service_client";

export async function getViews(challengeId: number) {
  return Number(await serviceClient.cache().get(`views:${challengeId}`));
}

export async function getLikes(challengeId: number) {
  return Number(await serviceClient.cache().get(`likes:${challengeId}`));
}

export async function getAttempts(challengeId: number) {
  return Number(await serviceClient.cache().get(`attempts:${challengeId}`));
}

export async function getSolves(challengeId: number) {
  return Number(await serviceClient.cache().get(`solves:${challengeId}`));
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
  if (isIncrement) {
    await serviceClient.cache().incr(`likes:${challengeId}`);
  } else {
    await serviceClient.cache().decr(`likes:${challengeId}`);
  }
}

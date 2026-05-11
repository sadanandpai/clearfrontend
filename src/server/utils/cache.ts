import "server-only";

import { serviceClient } from "@/server/services/service_client";

export function safeCount(val: string | number | null | undefined): number {
  const n = Number(val);
  return isNaN(n) || n < 0 ? 0 : Math.floor(n);
}

export async function getFromCacheOrDB(
  key: string,
  fallback: () => Promise<number>,
): Promise<number> {
  const redis = serviceClient.cache();
  const cached = await redis.get(key);
  if (cached !== null) return safeCount(cached);

  const value = await fallback();
  await redis.set(key, value);
  return value;
}

export async function ensureCacheSeeded(
  key: string,
  fallback: () => Promise<number>,
): Promise<void> {
  const redis = serviceClient.cache();
  const exists = await redis.exists(key);
  if (!exists) {
    const value = await fallback();
    await redis.set(key, value);
  }
}

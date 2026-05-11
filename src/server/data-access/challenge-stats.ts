import "server-only";

import { DB, CHALLENGE_INFO_COLLECTION } from "@/server/config/appwrite.config";
import { getUniqueID } from "@/server/services/appwrite";
import { serviceClient } from "../services/service_client";
import { safeCount } from "@/server/utils/cache";

export type StatField = "likes" | "solves";

export interface ChallengeStats {
  likes: number;
  solves: number;
}

export const EMPTY_STATS: ChallengeStats = { likes: 0, solves: 0 };

async function findStatsDoc(challengeId: number) {
  const { databases, Query } = serviceClient.adminDatabase();
  const result = await databases.listDocuments(DB, CHALLENGE_INFO_COLLECTION, [
    Query.equal("cId", challengeId),
    Query.limit(1),
  ]);
  return result.documents[0] ?? null;
}

export async function getStatsFromDB(challengeId: number): Promise<ChallengeStats> {
  try {
    const doc = await findStatsDoc(challengeId);
    if (!doc) return EMPTY_STATS;
    return {
      likes: safeCount(doc.likes),
      solves: safeCount(doc.solves),
    };
  } catch {
    return EMPTY_STATS;
  }
}

export async function incrementStatInDB(challengeId: number, field: StatField): Promise<void> {
  try {
    const { databases } = serviceClient.adminDatabase();
    const doc = await findStatsDoc(challengeId);
    if (doc) {
      await databases.updateDocument(DB, CHALLENGE_INFO_COLLECTION, doc.$id, {
        [field]: safeCount(doc[field]) + 1,
      });
    } else {
      await databases.createDocument(DB, CHALLENGE_INFO_COLLECTION, getUniqueID(), {
        ...EMPTY_STATS,
        cId: challengeId,
        [field]: 1,
      });
    }
  } catch {
    // DB failure must not break the Redis-primary path
  }
}

export async function decrementStatInDB(challengeId: number, field: StatField): Promise<void> {
  try {
    const { databases } = serviceClient.adminDatabase();
    const doc = await findStatsDoc(challengeId);
    if (!doc) return;
    const current = safeCount(doc[field]);
    if (current > 0) {
      await databases.updateDocument(DB, CHALLENGE_INFO_COLLECTION, doc.$id, {
        [field]: current - 1,
      });
    }
  } catch {
    // DB failure must not break the Redis-primary path
  }
}

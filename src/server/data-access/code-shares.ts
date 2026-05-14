import "server-only";

import type { Models } from "node-appwrite";
import { Permission, Role } from "node-appwrite";
import { DB, CODE_SHARE_COLLECTION } from "@/server/config/appwrite.config";
import { getUniqueID } from "@/server/services/appwrite";
import { serviceClient } from "../services/service_client";
import type { CodeShare } from "@/common/types/code-share.types";

const SHARE_TTL_DAYS = 15;

function toCodeShare(doc: Models.Document & Record<string, unknown>): CodeShare {
  return {
    $id: doc.$id,
    $createdAt: doc.$createdAt,
    userId: doc["userId"] as string,
    cId: doc["cId"] as number,
    code: doc["code"] as string,
    expiresAt: doc["expiresAt"] as string,
  };
}

export async function getMyShareRecord(challengeId: number, userId: string): Promise<CodeShare | null> {
  const { databases, Query } = serviceClient.adminDatabase();
  const result = await databases.listDocuments(DB, CODE_SHARE_COLLECTION, [
    Query.equal("cId", challengeId),
    Query.equal("userId", userId),
    Query.limit(1),
  ]);
  return result.documents[0] ? toCodeShare(result.documents[0]) : null;
}

export async function upsertShareRecord(
  challengeId: number,
  userId: string,
  code: string,
): Promise<CodeShare> {
  const { databases, Query } = serviceClient.adminDatabase();

  const existing = await databases.listDocuments(DB, CODE_SHARE_COLLECTION, [
    Query.equal("cId", challengeId),
    Query.equal("userId", userId),
    Query.limit(1),
  ]);
  if (existing.documents[0]) {
    await databases.deleteDocument(DB, CODE_SHARE_COLLECTION, existing.documents[0].$id);
  }

  const expiresAt = new Date(Date.now() + SHARE_TTL_DAYS * 86_400_000).toISOString();
  const doc = await databases.createDocument(
    DB,
    CODE_SHARE_COLLECTION,
    getUniqueID(),
    { cId: challengeId, userId, code, expiresAt },
    [Permission.read(Role.any())],
  );
  return toCodeShare(doc);
}

export async function getShareRecord(shareId: string): Promise<CodeShare | null> {
  try {
    const { databases, Query } = serviceClient.adminDatabase();
    const result = await databases.listDocuments(DB, CODE_SHARE_COLLECTION, [
      Query.equal("$id", shareId),
      Query.limit(1),
    ]);
    if (!result.documents[0]) return null;
    const share = toCodeShare(result.documents[0]);
    if (new Date(share.expiresAt) < new Date()) {
      databases.deleteDocument(DB, CODE_SHARE_COLLECTION, share.$id).catch(() => {});
      return null;
    }
    return share;
  } catch {
    return null;
  }
}

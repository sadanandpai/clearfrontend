import "server-only";

import type { Models } from "node-appwrite";
import { Permission, Role } from "node-appwrite";
import { DB, CODE_SHARE_COLLECTION } from "@/server/config/appwrite.config";
import { getUniqueID } from "@/server/services/appwrite";
import { serviceClient } from "../services/service_client";
import type { CodeShare } from "@/common/types/code-share.types";

const SHARE_TTL_DAYS = 15;

function toCodeShare(row: Models.Row & Record<string, unknown>): CodeShare {
  return {
    $id: row.$id,
    $createdAt: row.$createdAt,
    userId: row["userId"] as string,
    cId: row["cId"] as number,
    code: row["code"] as string,
    expiresAt: row["expiresAt"] as string,
  };
}

export async function getMyShareRecord(challengeId: number, userId: string): Promise<CodeShare | null> {
  const { tables, Query } = serviceClient.adminDatabase();
  const result = await tables.listRows({
    databaseId: DB,
    tableId: CODE_SHARE_COLLECTION,
    queries: [Query.equal("cId", challengeId), Query.equal("userId", userId), Query.limit(1)],
  });
  return result.rows[0] ? toCodeShare(result.rows[0]) : null;
}

export async function upsertShareRecord(
  challengeId: number,
  userId: string,
  code: string,
): Promise<CodeShare> {
  const { tables, Query } = serviceClient.adminDatabase();

  const existing = await tables.listRows({
    databaseId: DB,
    tableId: CODE_SHARE_COLLECTION,
    queries: [Query.equal("cId", challengeId), Query.equal("userId", userId), Query.limit(1)],
  });
  if (existing.rows[0]) {
    await tables.deleteRow({
      databaseId: DB,
      tableId: CODE_SHARE_COLLECTION,
      rowId: existing.rows[0].$id,
    });
  }

  const expiresAt = new Date(Date.now() + SHARE_TTL_DAYS * 86_400_000).toISOString();
  const row = await tables.createRow({
    databaseId: DB,
    tableId: CODE_SHARE_COLLECTION,
    rowId: getUniqueID(),
    data: { cId: challengeId, userId, code, expiresAt },
    permissions: [Permission.read(Role.any())],
  });
  return toCodeShare(row);
}

export async function getShareRecord(shareId: string): Promise<CodeShare | null> {
  try {
    const { tables, Query } = serviceClient.adminDatabase();
    const result = await tables.listRows({
      databaseId: DB,
      tableId: CODE_SHARE_COLLECTION,
      queries: [Query.equal("$id", shareId), Query.limit(1)],
    });
    if (!result.rows[0]) return null;
    const share = toCodeShare(result.rows[0]);
    if (new Date(share.expiresAt) < new Date()) {
      tables.deleteRow({ databaseId: DB, tableId: CODE_SHARE_COLLECTION, rowId: share.$id }).catch(() => {});
      return null;
    }
    return share;
  } catch {
    return null;
  }
}

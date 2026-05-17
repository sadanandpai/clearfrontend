import { DB, USER_CHALLENGE_INFO_COLLECTION } from "@/server/config/appwrite.config";
import { getUniqueID } from "@/server/services/appwrite";
import { serviceClient } from "../services/service_client";

export async function readUserChallengeInfo(challengeId: number) {
  const { tables, Query } = await serviceClient.database();

  const result = await tables.listRows({
    databaseId: DB,
    tableId: USER_CHALLENGE_INFO_COLLECTION,
    queries: [Query.equal("cId", challengeId), Query.limit(1)],
  });

  const row = result.rows[0];
  return row
    ? {
        $id: row.$id,
        like: row.like,
        solve: row.solve,
      }
    : null;
}

export async function createUserChallengeInfo(
  challengeId: number,
  data: Partial<{ like: boolean; solve: boolean }>,
) {
  const { tables } = await serviceClient.database();

  const row = await tables.createRow({
    databaseId: DB,
    tableId: USER_CHALLENGE_INFO_COLLECTION,
    rowId: getUniqueID(),
    data: {
      cId: challengeId,
      ...data,
    },
  });

  return {
    $id: row.$id,
    like: row.like,
    solve: row.solve,
  };
}

export async function updateUserChallengeInfo(
  documentId: string,
  challengeId: number,
  data: Partial<{ like: boolean; solve: boolean }>,
) {
  const { tables } = await serviceClient.database();

  const row = await tables.updateRow({
    databaseId: DB,
    tableId: USER_CHALLENGE_INFO_COLLECTION,
    rowId: documentId,
    data: {
      cId: challengeId,
      ...data,
    },
  });

  return {
    $id: row.$id,
    like: row.like,
    solve: row.solve,
  };
}

export async function getAllUserSolvedChallenges(): Promise<number[]> {
  const { tables, Query } = await serviceClient.database();

  try {
    const result = await tables.listRows({
      databaseId: DB,
      tableId: USER_CHALLENGE_INFO_COLLECTION,
      queries: [Query.equal("solve", true)],
    });

    return result.rows.map((row) => (row as unknown as { cId: number }).cId);
  
  } catch {
    return [];
  }
}

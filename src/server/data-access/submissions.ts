import "server-only";

import { getUniqueID } from "@/server/services/appwrite";
import { DB, SUBMISSIONS_COLLECTION } from "@/server/config/appwrite.config";
import { serviceClient } from "../services/service_client";

export async function getSubmissionsRecords(challengeId: number) {
  const { tables, Query } = await serviceClient.database();

  return await tables.listRows({
    databaseId: DB,
    tableId: SUBMISSIONS_COLLECTION,
    queries: [Query.equal("cId", challengeId)],
  });
}

export async function createSubmissionsRecord(challengeId: number, code: string, status: boolean) {
  const { tables } = await serviceClient.database();

  return await tables.createRow({
    databaseId: DB,
    tableId: SUBMISSIONS_COLLECTION,
    rowId: getUniqueID(),
    data: {
      cId: challengeId,
      code,
      status,
    },
  });
}

export async function deleteSubmissionsRecord(submissionId: string) {
  const { tables } = await serviceClient.database();

  return await tables.deleteRow({
    databaseId: DB,
    tableId: SUBMISSIONS_COLLECTION,
    rowId: submissionId,
  });
}

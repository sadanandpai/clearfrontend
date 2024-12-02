import "server-only";

import { Databases, Query } from "node-appwrite";
import {  getUniqueID } from "@/server/services/appwrite";
import { DB, SUBMISSIONS_COLLECTION } from "@/server/config/appwrite.config";
import { serviceClient } from "../services";

export async function getSubmissionsRecords(challengeId: number) {
  const client = (await serviceClient.createSession()).client;
  const databases = new Databases(client);

  return await databases.listDocuments(DB, SUBMISSIONS_COLLECTION, [
    Query.equal("cId", challengeId),
  ]);
}

export async function createSubmissionsRecord(
  challengeId: number,
  code: string,
  status: boolean
) {
  const client = (await serviceClient.createSession()).client;
  const databases = new Databases(client);

  return await databases.createDocument(
    DB,
    SUBMISSIONS_COLLECTION,
    getUniqueID(),
    {
      cId: challengeId,
      code,
      status,
    }
  );
}

export async function deleteSubmissionsRecord(submissionId: string) {
  const client = (await serviceClient.createSession()).client;
  const databases = new Databases(client);

  return await databases.deleteDocument(
    DB,
    SUBMISSIONS_COLLECTION,
    submissionId
  );
}

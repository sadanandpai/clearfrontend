import 'server-only';

import { getUniqueID } from '@/server/services/appwrite';
import { DB, SUBMISSIONS_COLLECTION } from '@/server/config/appwrite.config';
import { serviceClient } from '../services/service_client';

export async function getSubmissionsRecords(challengeId: number) {
  const { databases, Query } = await serviceClient.database();

  return await databases.listDocuments(DB, SUBMISSIONS_COLLECTION, [
    Query.equal('cId', challengeId),
  ]);
}

export async function createSubmissionsRecord(challengeId: number, code: string, status: boolean) {
  const { databases } = await serviceClient.database();

  return await databases.createDocument(DB, SUBMISSIONS_COLLECTION, getUniqueID(), {
    cId: challengeId,
    code,
    status,
  });
}

export async function deleteSubmissionsRecord(submissionId: string) {
  const { databases } = await serviceClient.database();

  return await databases.deleteDocument(DB, SUBMISSIONS_COLLECTION, submissionId);
}

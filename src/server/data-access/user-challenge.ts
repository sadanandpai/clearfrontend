import { DB, USER_CHALLENGE_INFO_COLLECTION } from "@/server/config/appwrite.config";
import { getUniqueID } from "@/server/services/appwrite";
import { serviceClient } from "../services/service_client";

export async function readUserChallengeInfo(challengeId: number) {
  const { databases, Query } = await serviceClient.database();

  const result = await databases.listDocuments(DB, USER_CHALLENGE_INFO_COLLECTION, [
    Query.equal("cId", challengeId),
    Query.limit(1),
  ]);

  const document = result.documents[0];
  return document
    ? {
        $id: document.$id,
        like: document.like,
        solve: document.solve,
      }
    : null;
}

export async function createUserChallengeInfo(
  challengeId: number,
  data: Partial<{ like: boolean; solve: boolean }>,
) {
  const { databases } = await serviceClient.database();

  const doc = await databases.createDocument(DB, USER_CHALLENGE_INFO_COLLECTION, getUniqueID(), {
    cId: challengeId,
    ...data,
  });

  return {
    $id: doc.$id,
    like: doc.like,
    solve: doc.solve,
  };
}

export async function updateUserChallengeInfo(
  documentId: string,
  challengeId: number,
  data: Partial<{ like: boolean; solve: boolean }>,
) {
  const { databases } = await serviceClient.database();

  const doc = await databases.updateDocument(DB, USER_CHALLENGE_INFO_COLLECTION, documentId, {
    cId: challengeId,
    ...data,
  });

  return {
    $id: doc.$id,
    like: doc.like,
    solve: doc.solve,
  };
}

export async function getAllUserSolvedChallenges(): Promise<number[]> {
  const { databases, Query } = await serviceClient.database();

  try {
    const result = await databases.listDocuments(DB, USER_CHALLENGE_INFO_COLLECTION, [
      Query.equal("solve", true),
    ]);

    return result.documents.map((doc) => (doc as unknown as { cId: number }).cId);
  
  } catch {
    return [];
  }
}

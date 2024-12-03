import { Databases, Query } from "node-appwrite";
import {
  DB,
  USER_CHALLENGE_INFO_COLLECTION,
} from "@/server/config/appwrite.config";
import {  getUniqueID } from "@/server/services/appwrite";
import { serviceClient } from "../services";

export async function readUserChallengeInfo(challengeId: number) {
  const client = (await serviceClient.createSession()).client;
  const databases = new Databases(client);

  const result = await databases.listDocuments(
    DB,
    USER_CHALLENGE_INFO_COLLECTION,
    [Query.equal("cId", challengeId), Query.limit(1)]
  );

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
  data: Partial<{ like: boolean; solve: boolean }>
) {
  const client = (await serviceClient.createSession()).client;
  const databases = new Databases(client);

  const doc = await databases.createDocument(
    DB,
    USER_CHALLENGE_INFO_COLLECTION,
    getUniqueID(),
    {
      cId: challengeId,
      ...data,
    }
  );

  return {
    $id: doc.$id,
    like: doc.like,
    solve: doc.solve,
  };
}

export async function updateUserChallengeInfo(
  documentId: string,
  challengeId: number,
  data: Partial<{ like: boolean; solve: boolean }>
) {
  const client = (await serviceClient.createSession()).client;
  const databases = new Databases(client);

  const doc = await databases.updateDocument(
    DB,
    USER_CHALLENGE_INFO_COLLECTION,
    documentId,
    {
      cId: challengeId,
      ...data,
    }
  );

  return {
    $id: doc.$id,
    like: doc.like,
    solve: doc.solve,
  };
}

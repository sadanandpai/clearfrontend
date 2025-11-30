import { CHALLENGE_INFO_COLLECTION, DB } from "../config/appwrite.config";
import { serviceClient } from "../services/service_client";


export async function countChallengeLikes(challengeId: number) {
    const { databases, Query } = await serviceClient.database();
    const res = await databases.listDocuments(DB, CHALLENGE_INFO_COLLECTION, [
        Query.equal("cId", challengeId),
        Query.equal("like", true),
        Query.limit(1),
    ]);
    // Appwrite returns total matching documents
    return res.total ?? (res.documents?.length ?? 0);
}

export async function countChallengeSolves(challengeId: number) {
    const { databases, Query } = await serviceClient.database();
    const res = await databases.listDocuments(DB, CHALLENGE_INFO_COLLECTION, [
        Query.equal("cId", challengeId),
        Query.equal("solve", true),
        Query.limit(1),
    ]);
    return res.total ?? (res.documents?.length ?? 0);
}

export async function countChallengeAttempts(challengeId: number) {
    const { databases, Query } = await serviceClient.database();
    const res = await databases.listDocuments(DB, CHALLENGE_INFO_COLLECTION, [
        Query.equal("cId", challengeId),
        Query.limit(1),
    ]);
    return res.total ?? (res.documents?.length ?? 0);
}
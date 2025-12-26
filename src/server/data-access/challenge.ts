import { CHALLENGE_INFO_COLLECTION, DB } from "../config/appwrite.config";
import { serviceClient } from "../services/service_client";
import { getUniqueID } from "../services/appwrite";


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

export async function getChallengeInfoDocument(challengeId: number) {
    const { databases, Query } = await serviceClient.database();
    const res = await databases.listDocuments(DB, CHALLENGE_INFO_COLLECTION, [
        Query.equal("cId", challengeId),
        Query.limit(1),
    ]);
    return res.documents[0] || null;
}

interface ChallengeInfoUpdate {
    likes?: number;
    views?: number;
    attempts?: number;
    solves?: number;
}

export async function upsertChallengeInfo(challengeId: number, updates: ChallengeInfoUpdate) {
    const { databases } = await serviceClient.database();

    // Try to find existing document first
    const existing = await getChallengeInfoDocument(challengeId);

    if (existing) {
        // Update existing document with provided fields (only update fields that are provided)
        const updateData: Record<string, number> = {};
        if (updates.likes !== undefined) updateData.likes = updates.likes;
        if (updates.views !== undefined) updateData.views = updates.views;
        if (updates.attempts !== undefined) updateData.attempts = updates.attempts;
        if (updates.solves !== undefined) updateData.solves = updates.solves;

        if (Object.keys(updateData).length > 0) {
            await databases.updateDocument(DB, CHALLENGE_INFO_COLLECTION, existing.$id, updateData);
        }
    } else {
        // Create new document if it doesn't exist with defaults for missing fields
        await databases.createDocument(DB, CHALLENGE_INFO_COLLECTION, getUniqueID(), {
            cId: challengeId,
            likes: updates.likes ?? 0,
            views: updates.views ?? 0,
            attempts: updates.attempts ?? 0,
            solves: updates.solves ?? 0,
        });
    }
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
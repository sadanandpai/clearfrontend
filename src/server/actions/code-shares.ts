"use server";

import { isValidChallengeId } from "@/server/utils/challenge";
import { getLoggedInUser } from "./auth";
import { getMyShareRecord, upsertShareRecord, getShareRecord } from "@/server/data-access/code-shares";
import type { CodeShare } from "@/common/types/code-share.types";

export async function getMyShare(challengeId: number): Promise<CodeShare | null> {
  if (!isValidChallengeId(challengeId)) return null;
  const user = await getLoggedInUser();
  if (!user) return null;
  return getMyShareRecord(challengeId, user.$id);
}

export async function upsertShare(challengeId: number, code: string): Promise<{ shareId: string }> {
  if (!isValidChallengeId(challengeId)) throw new Error("Invalid challenge");
  if (!code?.trim()) throw new Error("Code cannot be empty");

  const user = await getLoggedInUser();
  if (!user) throw new Error("Sign in to share your code");

  const share = await upsertShareRecord(challengeId, user.$id, code);
  return { shareId: share.$id };
}

export async function getShare(shareId: string): Promise<CodeShare | null> {
  if (!shareId || shareId.length > 64) return null;
  return getShareRecord(shareId);
}

"use server";

import {
  createSubmissionsRecord,
  deleteSubmissionsRecord,
  getSubmissionsRecords,
} from "@/server/data-access/submissions";

import { getLoggedInUser } from "./auth";
import { isValidChallengeId } from "@/server/utils/challenge";

export async function getUserSubmissions(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  const result = await getSubmissionsRecords(challengeId);
  // Appwrite models are class instances — server actions must return plain JSON.
  return JSON.parse(JSON.stringify(result)) as {
    total: number;
    documents: Array<Record<string, unknown>>;
  };
}

export async function submitUserSubmission(challengeId: number, code: string, status: boolean) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  const userCode = code.trim();
  if (typeof code !== "string" || userCode === "" || userCode.length > 1000) {
    throw new Error("Invalid code length or exceeds the limit");
  }

  const user = await getLoggedInUser();
  if (!user || !user.emailVerification) {
    throw new Error("User not logged in or email not verified");
  }

  await createSubmissionsRecord(challengeId, userCode, status);
  return { ok: true as const };
}

export async function deleteUserSubmission(submissionId: string) {
  await deleteSubmissionsRecord(submissionId);
  return { ok: true as const };
}

"use server";

import {
  createSubmissionsRecord,
  deleteSubmissionsRecord,
  getSubmissionsRecords,
} from "@/server/data-access/submissions";
import { isValidChallengeId } from "@/server/utils/challenge";
import { getLoggedInUser } from "./auth";

export async function getUserSubmissions(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await getSubmissionsRecords(challengeId);
}

export async function submitUserSubmission(challengeId: number, code: string, status: boolean) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  const userCode = code.trim();
  if (typeof code !== "string" || userCode === "" || userCode.length > 1000) {
    throw new Error("Code length exceeds limit");
  }

  const user = await getLoggedInUser();
  if (!user || !user.emailVerification) {
    throw new Error("User not logged in or email not verified");
  }

  return await createSubmissionsRecord(challengeId, code, status);
}

export async function deleteUserSubmission(submissionId: string) {
  return await deleteSubmissionsRecord(submissionId);
}

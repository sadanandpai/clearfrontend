import { ChallengeLoader } from "./challenge-loader";
import { incrementViews } from "@/server/data-access/activities";
import { isValidChallengeId } from "@/server/utils/challenge";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ challengeId: string }>;
}

export default async function ChallengePage({ params }: Props) {
  const { challengeId } = await params;
  const challengeIdAsNum = Number(challengeId);

  if (!isValidChallengeId(challengeIdAsNum)) {
    notFound();
  }

  // Don't await to avoid blocking the response
  incrementViews(challengeIdAsNum);

  return <ChallengeLoader challengeId={challengeId} />;
}

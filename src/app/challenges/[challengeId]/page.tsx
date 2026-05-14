import { ChallengeLoader } from "./challenge-loader";
import { incrementViews } from "@/server/data-access/activities";
import { getShare } from "@/server/actions/code-shares";
import { isValidChallengeId } from "@/server/utils/challenge";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ challengeId: string }>;
  searchParams: Promise<{ share?: string }>;
}

export default async function ChallengePage({ params, searchParams }: Props) {
  const { challengeId } = await params;
  const { share: shareId } = await searchParams;
  const challengeIdAsNum = Number(challengeId);

  if (!isValidChallengeId(challengeIdAsNum)) {
    notFound();
  }

  incrementViews(challengeIdAsNum);

  const share = shareId ? await getShare(shareId) : null;

  return <ChallengeLoader challengeId={challengeId} share={share ?? undefined} />;
}

import ChallengeUI from "@/ui/components/modules/challenge/challenge-ui";
import { ProblemProps } from "@/common/types/problem";
import { incrementViews } from "@/server/data-access/activities";
import { isValidChallengeId } from "@/server/utils/challenge";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ challengeId: string }>;
}

export default async function Challenge({ params }: Props) {
  const { challengeId } = await params;
  const challengeIdAsNum = Number(challengeId);

  if (!isValidChallengeId(challengeIdAsNum)) {
    notFound();
  }

  const problem: ProblemProps = await import(`@/common/challenges/${challengeId}`).then(
    (module) => module.problem,
  );

  // don't await to avoid blocking the response
  incrementViews(challengeIdAsNum);

  return <ChallengeUI problem={problem} />;
}

import { Suspense } from "react";

import { Challenge } from "@/common/types/challenge.types";
import { ChallengeList } from "./challenge-list/challenge-list";
import { ChallengesTable } from "./challenges-table/challenges-table";

interface Props {
  challenges: Challenge[];
  solvedChallengeIds: number[];
}

function ChallengesTableFallback() {
  return (
    <div
      className="w-full md:w-[90%] mx-auto px-4 md:px-0 min-h-48 rounded-md border border-(--gray-a6)"
      aria-hidden
    />
  );
}

export function ChallengesUI({ challenges, solvedChallengeIds }: Props) {
  return (
    <>
      <ChallengeList challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
      <Suspense fallback={<ChallengesTableFallback />}>
        <ChallengesTable challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
      </Suspense>
    </>
  );
}

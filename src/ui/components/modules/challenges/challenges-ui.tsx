import { Challenge } from "@/common/types/challenge.types";
import { ChallengesTable } from "./challenges-table/challenges-table";
import { ChallengeList } from "./challenge-list";

interface Props {
  challenges: Challenge[];
  solvedChallengeIds: number[];
}

export function ChallengesUI({ challenges, solvedChallengeIds }: Props) {
  return (
    <>
      <ChallengeList challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
      <ChallengesTable challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
    </>
  );
}

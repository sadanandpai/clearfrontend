import { Challenge } from "@/common/types/challenge.types";
import { ChallengeStats } from "./challenges-stats/challenge-stats";
import { ChallengesTable } from "./challenges-table/challenges-table";

interface Props {
  challenges: Challenge[];
  solvedChallengeIds: number[];
}

export function ChallengesUI({ challenges, solvedChallengeIds }: Props) {
  return (
    <>
      <ChallengeStats challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
      <ChallengesTable challenges={challenges} />
    </>
  );
}

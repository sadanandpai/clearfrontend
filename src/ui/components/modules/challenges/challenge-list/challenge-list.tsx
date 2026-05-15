"use client";

import { ChallengeStats } from "../stats/challenge-stats";
import { ProgressCircle } from "./progress-circle";
import { Challenge } from "@/common/types/challenge.types";

export function ChallengeList({
  challenges,
  solvedChallengeIds,
}: {
  challenges: Challenge[];
  solvedChallengeIds: number[];
}) {
  return (
    <div className="w-full">
      {/* Challenge stats Dashboard */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 my-6 px-4 md:px-[5%]">
        <ProgressCircle solved={solvedChallengeIds.length} total={challenges.length} />
        <ChallengeStats challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
      </div>
    </div>
  );
}

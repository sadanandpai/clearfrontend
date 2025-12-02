"use client";

import { Flex } from "@radix-ui/themes";
import { ChallengeStats } from "./challenges-stats/challenge-stats";
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
      <Flex gap="3" style={{ margin: "1.5rem 0", padding: "0 5%" }} align="stretch">
        <ProgressCircle
          solved={solvedChallengeIds.length}
          total={challenges.length}
        />
        <ChallengeStats
          challenges={challenges}
          solvedChallengeIds={solvedChallengeIds}
        />
      </Flex>
    </div>
  );
}
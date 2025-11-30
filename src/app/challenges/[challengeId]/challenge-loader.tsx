"use client";

import { useEffect, useState } from "react";

import ChallengeUI from "@/ui/components/modules/challenge/challenge-ui";
import { ProblemProps } from "@/common/types/problem";

export function ChallengeLoader({ challengeId }: { challengeId: string }) {
  const [problem, setProblem] = useState<ProblemProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const challengeModule = await import(`@/common/challenges/${challengeId}`);
        setProblem(challengeModule.problem);
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }
    };

    loadProblem();
  }, [challengeId]);

  return <ChallengeUI problem={problem} error={error} isLoading={isLoading} />;
}

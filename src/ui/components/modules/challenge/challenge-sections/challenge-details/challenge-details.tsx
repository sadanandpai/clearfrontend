import { Box, ScrollArea, Spinner, Tabs } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { ChallengeResults } from "@/ui/components/modules/challenge/challenge-elements/challenge-results/challenge-results";
import { ChallengeSolution } from "@/ui/components/modules/challenge/challenge-elements/challenge-solution/challenge-solution";
import { ChallengeSubmissions } from "@/ui/components/modules/challenge/challenge-elements/challenge-submissions/challenge-submissions";
import { ProblemProps } from "@/common/types/problem";
import { ProblemStatement } from "@/ui/components/modules/challenge/challenge-elements/challenge-statement/challenge-statement";
import { useActiveCode } from "@codesandbox/sandpack-react/unstyled";
import { useChallengeStore } from "@/ui/store/challenge.store";

interface Props {
  problem?: ProblemProps | null;
  isLoading: boolean;
}

export function ChallengeDetails({ problem, isLoading }: Props) {
  const [selectedTab, setSelectedTab] = useState("question");
  const testOutputs = useChallengeStore((state) => state.testOutputs);
  const { code } = useActiveCode();
  const [submittedCode, setSubmittedCode] = useState<string>("");

  useEffect(() => {
    if (testOutputs?.isLoading) {
      setSelectedTab("result");
    }
    if (testOutputs?.outputs?.length) {
      setSubmittedCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testOutputs, setSelectedTab]);

  if (!problem || isLoading) {
    return <Spinner />;
  }

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="panel-layout flex flex-col"
    >
      <Tabs.List className="shrink-0">
        <Tabs.Trigger value="question">Question</Tabs.Trigger>
        <Tabs.Trigger value="result" className="hidden md:block">
          Result
        </Tabs.Trigger>
        <Tabs.Trigger value="solution">Solution</Tabs.Trigger>
        <Tabs.Trigger value="submissions">Submissions</Tabs.Trigger>
      </Tabs.List>

      <ScrollArea type="auto">
        <Box p="3">
          <Tabs.Content value="question">
            <ProblemStatement problem={problem} />
          </Tabs.Content>

          <Tabs.Content value="result">
            <ChallengeResults
              setSelectedTab={setSelectedTab}
              testOutputs={testOutputs}
              submittedCode={submittedCode || code}
            />
          </Tabs.Content>

          <Tabs.Content value="solution">
            <ChallengeSolution code={problem.solution} />
          </Tabs.Content>

          <Tabs.Content value="submissions">
            <ChallengeSubmissions />
          </Tabs.Content>
        </Box>
      </ScrollArea>
    </Tabs.Root>
  );
}

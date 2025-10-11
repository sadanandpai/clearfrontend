import { useEffect, useRef, useState } from "react";
import { ChallengeSolution } from "@/ui/components/modules/challenge/challenge-elements/challenge-solution/challenge-solution";
import { ChallengeResults } from "@/ui/components/modules/challenge/challenge-elements/challenge-results/challenge-results";
import { ProblemStatement } from "@/ui/components/modules/challenge/challenge-elements/challenge-statement/challenge-statement";
import { ChallengeSubmissions } from "@/ui/components/modules/challenge/challenge-elements/challenge-submissions/challenge-submissions";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { ProblemProps } from "@/common/types/problem";
import { Box, ScrollArea, Tabs } from "@radix-ui/themes";
import { useActiveCode } from "@codesandbox/sandpack-react/unstyled";

interface Props {
  problem: ProblemProps;
}

export function ChallengeDetails({ problem }: Props) {
  const [selectedTab, setSelectedTab] = useState("question");
  const testOutputs = useChallengeStore((state) => state.testOutputs);
  const { code } = useActiveCode();
  const submittedCode = useRef<string>("");

  useEffect(() => {
    if (testOutputs?.isLoading) {
      setSelectedTab("result");
    }

    if (testOutputs?.outputs?.length) {
      submittedCode.current = code;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testOutputs, setSelectedTab]);

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="panel-layout flex flex-col"
    >
      <Tabs.List className="flex-shrink-0">
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
              submittedCode={submittedCode.current}
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

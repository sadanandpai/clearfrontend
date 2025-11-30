"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { ChallengeDetails } from "@/ui/components/modules/challenge/challenge-sections/challenge-details/challenge-details";
import { ChallengeEditor } from "./challenge-sections/challenge-editor/challenge-editor";
import { ChallengeTerminal } from "./challenge-sections/challenge-terminal/challenge-terminal";
import { ProblemProps } from "@/common/types/problem";
import { SandpackProvider } from "@codesandbox/sandpack-react/unstyled";
import { testCode } from "@/ui/utils/test-code";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { useEffect } from "react";

interface Props {
  problem: ProblemProps | null;
  error: boolean;
  isLoading: boolean;
}

export default function ChallengeUI({ problem, error, isLoading }: Props) {
  const files = problem
    ? {
        "/code.ts": problem.code,
        "/add.test.ts": testCode(problem.sampleInput),
        "/test-cases.test.ts": problem.testCases,
        "/solution.ts": problem.solution,
      }
    : {
        "/code.ts": "",
        "/add.test.ts": "",
        "/test-cases.test.ts": "",
        "/solution.ts": "",
      };
  const resetOutput = useChallengeStore((state) => state.resetOutput);
  const resetOutputs = useChallengeStore((state) => state.resetOutputs);

  useEffect(() => {
    return () => {
      resetOutput();
      resetOutputs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem]);

  if (error) {
    return <div>Error loading challenge</div>;
  }

  return (
    <SandpackProvider
      files={files}
      template="test-ts"
      options={{
        activeFile: "/code.ts",
        visibleFiles: ["/code.ts"],
        initMode: "immediate",
        autorun: true,
      }}
      className="h-full"
    >
      <PanelGroup direction="horizontal">
        <Panel minSize={25} defaultSize={40} className="panel left">
          <ChallengeDetails problem={problem} isLoading={isLoading} />
        </Panel>
        <PanelResizeHandle />
        <Panel minSize={30} defaultSize={60} className="hidden md:block">
          <PanelGroup direction="vertical">
            <Panel defaultSize={75} minSize={50} className="panel right top">
              <ChallengeEditor defaultCode={problem?.code || ""} isLoading={isLoading} />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={25} minSize={25} className="panel right bottom">
              <ChallengeTerminal defaultInput={problem?.sampleInput || ""} isLoading={isLoading} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </SandpackProvider>
  );
}

"use client";

import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Callout } from "@radix-ui/themes";
import { Info } from "lucide-react";

import { ChallengeDetails } from "@/ui/components/modules/challenge/challenge-sections/challenge-details/challenge-details";
import { ChallengePageLoader } from "@/ui/components/modules/challenge/challenge-page-loader";
import { ChallengeEditor } from "./challenge-sections/challenge-editor/challenge-editor";
import { ChallengeTerminal } from "./challenge-sections/challenge-terminal/challenge-terminal";
import { ProblemProps } from "@/common/types/problem";
import type { CodeShare } from "@/common/types/code-share.types";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { useEffect } from "react";
import { useIsDesktop } from "@/ui/hooks/use-media-query";
import classes from "./challenge-ui.module.scss";

interface Props {
  problem: ProblemProps | null;
  error: boolean;
  isLoading: boolean;
  share?: CodeShare;
}

export default function ChallengeUI({ problem, error, isLoading, share }: Props) {
  const resetOutput = useChallengeStore((state) => state.resetOutput);
  const resetOutputs = useChallengeStore((state) => state.resetOutputs);
  const resetConsoleLogs = useChallengeStore((state) => state.resetConsoleLogs);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    return () => {
      resetOutput();
      resetOutputs();
      resetConsoleLogs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem]);

  if (error) {
    return <div>Error loading challenge</div>;
  }

  if (isLoading || !problem) {
    return <ChallengePageLoader />;
  }

  const sharedCallout = share && (
    <Callout.Root size="1" mx="2" mt="2">
      <Callout.Icon>
        <Info size={14} />
      </Callout.Icon>
      <Callout.Text>
        Viewing shared code · Shared on {new Date(share.$createdAt).toLocaleDateString("en-CA")} ·
        Expires {new Date(share.expiresAt).toLocaleDateString("en-CA")}
      </Callout.Text>
    </Callout.Root>
  );

  if (!isDesktop) {
    return (
      <div className={classes.mobileLayout}>
        {sharedCallout}
        <section className={classes.mobileSection}>
          <ChallengeDetails problem={problem} isLoading={false} />
        </section>
        <section className={`${classes.mobileSection} ${classes.mobileEditorSection}`}>
          <ChallengeEditor
            defaultCode={problem.code}
            isLoading={false}
            testCode={problem.testCode}
            testCases={problem.testCases}
            solution={problem.solution}
            sharedCode={share?.code}
          />
        </section>
        <section className={classes.mobileSection}>
          <ChallengeTerminal
            defaultInput={problem.sampleInput}
            testCode={problem.testCode}
            isLoading={false}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {sharedCallout}
      <PanelGroup orientation="horizontal" className="flex-1 min-h-0">
        <Panel minSize={25} defaultSize={40} className="panel left">
          <ChallengeDetails problem={problem} isLoading={false} />
        </Panel>
        <PanelResizeHandle />
        <Panel minSize={30} defaultSize={60}>
          <PanelGroup orientation="vertical">
            <Panel defaultSize={75} minSize={50} className="panel right top">
              <ChallengeEditor
                defaultCode={problem.code}
                isLoading={false}
                testCode={problem.testCode}
                testCases={problem.testCases}
                solution={problem.solution}
                sharedCode={share?.code}
              />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={25} minSize={25} className="panel right bottom">
              <ChallengeTerminal
                defaultInput={problem.sampleInput}
                testCode={problem.testCode}
                isLoading={false}
              />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

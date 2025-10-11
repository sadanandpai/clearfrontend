import { useEffect, useState } from "react";
import { Box, ScrollArea, Tabs } from "@radix-ui/themes";
import { ChallengeInput } from "@/ui/components/modules/challenge/challenge-elements/challenge-input/challenge-input";
import { ChallengeConsole } from "@/ui/components/modules/challenge/challenge-elements/challenge-console/challenge-console";
import { ChallengeOutput } from "@/ui/components/modules/challenge/challenge-elements/challenge-output/challenge-output";
import { useChallengeStore } from "@/ui/store/challenge.store";

interface Props {
  defaultInput: string;
}

export function ChallengeTerminal({ defaultInput }: Props) {
  const [selectedTab, setSelectedTab] = useState("input");
  const testOutput = useChallengeStore((state) => state.testOutput);

  useEffect(() => {
    if (testOutput?.status !== undefined) {
      setSelectedTab("output");
    }
  }, [testOutput]);

  return (
    <div className="panel-layout">
      <Tabs.Root
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="panel-layout flex flex-col"
      >
        <Tabs.List className="flex-shrink-0">
          <Tabs.Trigger value="input">Input</Tabs.Trigger>
          <Tabs.Trigger value="output">Output</Tabs.Trigger>
          <Tabs.Trigger value="console">Console</Tabs.Trigger>
        </Tabs.List>

        <ScrollArea type="auto">
          <Box p="3">
            <Tabs.Content value="input" hidden={selectedTab !== "input"} forceMount>
              <ChallengeInput defaultInput={defaultInput} />
            </Tabs.Content>

            <Tabs.Content value="output">
              <ChallengeOutput testOutput={testOutput} />
            </Tabs.Content>

            <Tabs.Content
              value="console"
              className="static"
              hidden={selectedTab !== "console"}
              forceMount
            >
              <ChallengeConsole />
            </Tabs.Content>
          </Box>
        </ScrollArea>
      </Tabs.Root>
    </div>
  );
}

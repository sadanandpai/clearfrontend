"use client";

import { Button, Flex } from "@radix-ui/themes";
import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { appContext } from "@/ui/context/app.context";
import { executeTests } from "@/server/actions/execute";
import { incrementChallengeAttempts } from "@/server/actions/challenge";
import { setUserChallengeSolve } from "@/server/actions/user-challenge";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { useContext } from "react";
import { usePathname } from "next/navigation";

interface Props {
  testCode: (arg: string) => string;
  testCases: string;
  solution: string;
}

export function Executor({ testCode, testCases, solution }: Props) {
  const { user } = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const userCode = useChallengeStore((state) => state.userCode);
  const userInput = useChallengeStore((state) => state.userInput);
  const setOutput = useChallengeStore((state) => state.setOutput);
  const setOutputs = useChallengeStore((state) => state.setOutputs);
  const setConsoleLogs = useChallengeStore((state) => state.setConsoleLogs);

  const [isPendingRun, startRun] = useTransition();
  const [isPendingRunAll, startRunAll] = useTransition();

  const queryClient = useQueryClient();

  const { mutate: markChallengeComplete, isPending } = useMutation({
    mutationKey: ["userChallengeInfo", "solve", challengeId],
    mutationFn: () => setUserChallengeSolve(challengeId),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["userChallengeInfo", challengeId],
        (oldData: { $id: string; like: boolean; solve: boolean }) => ({
          ...oldData,
          solve: data.solve,
        }),
      );
    },
  });

  function runUserTest() {
    startRun(async () => {
      setOutput({ isLoading: true });
      const result = await executeTests(userCode, testCode(userInput), solution);
      setConsoleLogs(result.consoleLogs);
      setOutput({
        isLoading: false,
        status: result.outputs[0]?.status === "pass",
        output: result.outputs[0],
      });
    });
  }

  function runAllTests() {
    startRunAll(async () => {
      setOutputs({ isLoading: true });
      const result = await executeTests(userCode, testCases, solution);

      if (user && result.status && !isPending) {
        markChallengeComplete();
      }

      incrementChallengeAttempts(challengeId);
      setConsoleLogs(result.consoleLogs);
      setOutputs({
        isLoading: false,
        status: result.status,
        outputs: result.outputs,
        executionId: Date.now(),
      });
    });
  }

  return (
    <Flex justify="end" align="center" gap="1" mt="2" mr="2">
      <Button
        onClick={runUserTest}
        disabled={isPendingRun || isPendingRunAll}
        loading={isPendingRun}
      >
        Run
      </Button>
      <Button
        onClick={runAllTests}
        disabled={isPendingRun || isPendingRunAll}
        loading={isPendingRunAll}
      >
        Run All
      </Button>
    </Flex>
  );
}

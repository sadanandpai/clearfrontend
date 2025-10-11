"use client";

import { usePathname } from "next/navigation";
import { Button, Flex } from "@radix-ui/themes";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { useLoadingOverlayState, useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { getTestResult, getTestResults } from "@/ui/utils/test-results";
import { incrementChallengeAttempts } from "@/server/actions/challenge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUserChallengeSolve } from "@/server/actions/user-challenge";
import { useContext } from "react";
import { appContext } from "@/ui/context/app.context";
import { ErrorProps } from "@/ui/utils/test-results";

export function Executor() {
  const { user } = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));
  const { dispatch, listen } = useSandpack();
  const setOutput = useChallengeStore((state) => state.setOutput);
  const setOutputs = useChallengeStore((state) => state.setOutputs);
  const overlayState = useLoadingOverlayState();
  const queryClient = useQueryClient();

  const { mutate: markChallengeComplete, isPending } = useMutation({
    mutationKey: ["userChallengeInfo", "solve", challengeId],
    mutationFn: () => setUserChallengeSolve(challengeId),
    onSuccess: (data) => {
      // update the cache of query (this helps to update the UI without invoking the API again)
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
    setOutput({ isLoading: true });
    const unsubscribe = getTestResult(
      listen,
      (result) => {
        setOutput({ isLoading: false, ...result });
        unsubscribe();
      },
      () => {
        setOutput({ isLoading: false });
        unsubscribe();
      },
    );

    dispatch({
      type: "run-tests",
      path: "/add.test.ts",
    });
  }

  async function runAllTests() {
    setOutputs({ isLoading: true });

    // Safety timeout to avoid infinite loader if no completion is emitted
    const timeoutId = setTimeout(() => {
      setOutputs({ isLoading: false, executionId: Date.now() });
    }, 15000);

    const unsubscribe = getTestResults(
      listen,
      (result) => {
        clearTimeout(timeoutId);
        if (user && result.status && !isPending) {
          markChallengeComplete();
        }

        incrementChallengeAttempts(challengeId);
        setOutputs({ isLoading: false, ...result, executionId: Date.now() });
        unsubscribe();
      },
      () => {
        clearTimeout(timeoutId);
        setOutputs({ isLoading: false, executionId: Date.now() });
        unsubscribe();
      },
    );

    dispatch({
      type: "run-tests",
      path: "/test-cases.test.ts",
    });
  }

  return (
    <Flex justify="end" align="center" gap="1" mt="2" mr="2">
      <Button onClick={runUserTest} disabled={overlayState !== "HIDDEN"}>
        Run
      </Button>
      <Button onClick={runAllTests} disabled={overlayState !== "HIDDEN"}>
        Run All
      </Button>
    </Flex>
  );
}

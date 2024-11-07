import { TestResultProps } from "@/common/types/test";
import { SandpackClientListen } from "@codesandbox/sandpack-react";

export function getTestResult(
  listen: SandpackClientListen,
  onComplete: (result: TestResultProps) => void
) {
  return listen((data) => {
    if (
      data.type === "test" &&
      data.event === "test_end" &&
      data.test.path === "/add.test.ts"
    ) {
      onComplete({
        name: data.test.name,
        status: data.test.status,
        error: data.test.errors?.[0]?.message,
      });
    }
  });
}

export function getTestResults(
  listen: SandpackClientListen,
  onComplete: (results: TestResultProps[]) => void
) {
  let allTestResults: TestResultProps[] = [];
  return listen((data) => {
    if (data.type === "test" && data.event === "total_test_start") {
      allTestResults = [];
    }

    if (
      data.type === "test" &&
      data.event === "test_end" &&
      data.test.path === "/test-cases.test.ts"
    ) {
      allTestResults.push({
        name: data.test.name,
        status: data.test.status,
        error: data.test.errors?.[0]?.message,
      });
    }

    if (data.type === "test" && data.event === "total_test_end") {
      onComplete(allTestResults);
    }
  });
}
import { SandpackClientListen } from "@codesandbox/sandpack-react/unstyled";
import { TestOutputProps } from "@/common/types/test";

export interface ErrorProps {
  type: string;
  event: string;
  codesandbox: boolean;
}

interface TestData {
  name: string;
  status: string;
  path: string;
  errors?: { message: string }[];
}

// Simple type guard for test data
function isTestEndEvent(data: unknown): data is { test: TestData } {
  const obj = data as Record<string, unknown>;
  return obj?.event === "test_end" && !!obj?.test && typeof obj.test === "object";
}

// Helper to create test output
function createTestOutput(test: TestData): TestOutputProps {
  return {
    name: test.name,
    status: test.status,
    error: test.errors?.[0]?.message || "",
  };
}
export function getTestResult(
  listen: SandpackClientListen,
  onComplete: (result: { status: boolean; output: TestOutputProps }) => void,
  onError?: (error: ErrorProps) => void,
) {
  return listen((data) => {
    if (data.type !== "test") {
      return;
    }

    if (isTestEndEvent(data) && data.test.path.endsWith("/add.test.ts")) {
      onComplete({
        status: data.test.status === "pass",
        output: createTestOutput(data.test),
      });
      return;
    }

    if (data.event === "file_error") {
      onError?.(data as ErrorProps);
    }
  });
}

export function getTestResults(
  listen: SandpackClientListen,
  onComplete: (result: { status: boolean; outputs: TestOutputProps[] }) => void,
  onError: (error: ErrorProps) => void,
) {
  let status = true;
  let outputs: TestOutputProps[] = [];
  return listen((data) => {
    if (data.type !== "test") {
      return;
    }

    if (data.event === "total_test_start") {
      status = true;
      outputs = [];
      return;
    }

    if (isTestEndEvent(data) && data.test.path.endsWith("/test-cases.test.ts")) {
      status &&= data.test.status === "pass";
      outputs.push(createTestOutput(data.test));
      return;
    }

    if (data.event === "total_test_end") {
      onComplete({ status, outputs });
      return;
    }

    // Forward only explicit error-like events to the error handler
    if (data.event === "file_error") {
      onError(data as ErrorProps);
    }
  });
}

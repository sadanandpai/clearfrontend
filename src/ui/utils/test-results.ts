import { TestOutputProps } from "@/common/types/test";
import { SandpackClientListen } from "@codesandbox/sandpack-react/unstyled";

export interface ErrorProps {
  type: string;
  event: string;
  codesandbox: boolean;
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

    if (data.event === "test_end" && data?.test?.path?.endsWith("/add.test.ts")) {
      onComplete({
        status: data.test.status === "pass",
        output: {
          name: data.test.name,
          status: data.test.status,
          error: data.test.errors?.[0]?.message,
        },
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

    if (data.event === "test_end" && (data as any)?.test?.path?.endsWith("/test-cases.test.ts")) {
      status &&= (data as any).test.status === "pass";
      outputs.push({
        name: (data as any).test.name,
        status: (data as any).test.status,
        error: (data as any).test.errors?.[0]?.message,
      });
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

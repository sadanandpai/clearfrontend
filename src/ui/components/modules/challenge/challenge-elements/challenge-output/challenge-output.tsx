import { OutputStateProps } from "@/common/types/test";
import { TestResult } from "@/ui/components/core/test-result/test-result";
import { Spinner } from "@radix-ui/themes";

interface Props {
  testOutput: OutputStateProps | null;
}

export function ChallengeOutput({ testOutput }: Props) {
  if (!testOutput || testOutput?.status === undefined || !testOutput.output) {
    return (
      <div className="text-center mt-8">
        <p>Click on &apos;Run&apos; button to see the output</p>
      </div>
    );
  }

  if (testOutput.isLoading) {
    return (
      <div className="text-center mt-8">
        <Spinner size="3" />
      </div>
    );
  }

  return (
    <TestResult
      name={testOutput.output.name}
      status={testOutput.output.status}
      error={testOutput.output.error}
    />
  );
}

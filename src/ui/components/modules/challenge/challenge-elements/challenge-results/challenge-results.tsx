import { OutputsStateProps, TestOutputProps } from '@/common/types/test';
import { TestResult } from '@/ui/components/core/test-result/test-result';
import { SaveSubmission } from '@/ui/components/modules/challenge/challenge-components/save-submission/save-submission';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { Spinner } from '@radix-ui/themes';
import classes from './challenge-results.module.scss';

interface Props {
  testOutputs: OutputsStateProps | null;
  setSelectedTab: (tabName: string) => void;
  submittedCode: string;
}

let submittedExecutionId: number | undefined;

export function ChallengeResults({ setSelectedTab, testOutputs, submittedCode }: Props) {
  const queryClient = useQueryClient();
  const challengeId = Number(usePathname().split('/').at(-1));

  function onSubmit() {
    submittedExecutionId = testOutputs?.executionId;
    queryClient.invalidateQueries({ queryKey: ['submissions', challengeId] });
    setSelectedTab('submissions');
  }

  if (!testOutputs) {
    return (
      <div className={classes.verticalCenter}>
        <p>Click on &apos;Run all&apos; button to see the output</p>
      </div>
    );
  }

  if (testOutputs.isLoading) {
    return (
      <div className={classes.verticalCenter}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={classes.testResultsWrapper}>
      <div className={classes.testResults}>
        {testOutputs.outputs?.map((result: TestOutputProps, index: number) => (
          <TestResult key={index} {...result} />
        ))}
      </div>

      <SaveSubmission
        onSubmit={onSubmit}
        status={testOutputs.status}
        submittedCode={submittedCode}
        disabled={submittedExecutionId === testOutputs.executionId}
      />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChallengeSolution } from '@/ui/components/modules/challenge/challenge-elements/challenge-solution/challenge-solution';
import classes from './submissions-table.module.scss';
import { Trash } from 'lucide-react';
import { Code } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from '@radix-ui/themes';

interface Props {
  records: any[];
  deleteSubmission: (submissionId: string) => void;
  isLoading: boolean;
}

export function SubmissionsTable({ records, deleteSubmission, isLoading }: Props) {
  const [shouldDisplayCode, setShouldDisplayCode] = useState<string | null>(null);

  return (
    <div className={classes.tableWrapper}>
      <table className={classes.submissionsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: any) => (
            <Fragment key={record.$id}>
              <tr>
                <td>{new Date(record.$createdAt).toDateString()}</td>
                <td>JS</td>
                <td>{record.status ? 'Pass' : 'Fail'}</td>
                <td>
                  <Button
                    onClick={() => {
                      setShouldDisplayCode(shouldDisplayCode === record.$id ? null : record.$id);
                    }}
                    variant="ghost"
                    title="code"
                    aria-label="code"
                  >
                    <Code />
                  </Button>
                </td>
                <td>
                  <Button
                    title="delete"
                    variant="ghost"
                    onClick={() => deleteSubmission(record.$id)}
                    disabled={isLoading}
                    aria-label="delete"
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
              {shouldDisplayCode === record.$id && (
                <tr>
                  <td colSpan={5}>
                    <ChallengeSolution code={record.code} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProblemProps } from '@/common/types/problem';
import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import { InfoBar } from '@/ui/components/modules/challenge/challenge-components/info-bar/info-bar';
import { getChallengeActivity } from '@/server/actions/challenge';

interface Props {
  problem: ProblemProps;
}

export function ProblemStatement({ problem }: Props) {
  const challengeId = Number(usePathname().split('/').at(-1));

  const { data: activityData } = useQuery({
    queryKey: ['activity', challengeId],
    queryFn: () => getChallengeActivity(challengeId),
    staleTime: Infinity,
  });

  return (
    <div>
      <Flex gap="2" align="center">
        <Heading size="5">{problem.name}</Heading>

        {activityData?.views && (
          <Badge color="gray" variant="solid" size="1" radius="full">
            {activityData.views} views
          </Badge>
        )}

        {activityData?.attempts ? (
          <Badge color="gray" variant="solid" size="1" radius="full">
            {activityData.attempts} attempts
          </Badge>
        ) : null}

        {activityData?.solves ? (
          <Badge color="gray" variant="solid" size="1" radius="full">
            {activityData.solves} completions
          </Badge>
        ) : null}
      </Flex>

      <InfoBar difficulty={problem.difficulty} totalLikes={activityData?.likes} />

      <Text dangerouslySetInnerHTML={{ __html: problem.statement }}></Text>
      <Text dangerouslySetInnerHTML={{ __html: problem.description }}></Text>

      <div>
        {problem.examples.map((example, idx) => (
          <div key={idx} className="pt-8">
            <Text weight="bold">Example {idx + 1}</Text>

            <pre
              className="rounded-md p-4 mt-2 text-md flex flex-col gap-4"
              style={{
                backgroundColor: 'var(--gray-5)',
              }}
            >
              <span>Input: {example.input}</span>
              <span>Output: {example.output}</span>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

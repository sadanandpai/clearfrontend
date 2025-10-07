import Image from 'next/image';
import { Badge, Flex } from '@radix-ui/themes';
import { UserLikeStatus } from '@/ui/components/modules/challenge/challenge-components/user-like-status/user-like-status';
import { UserSolutionStatus } from '@/ui/components/modules/challenge/challenge-components/user-solution-status/user-solution-status';

interface Props {
  difficulty: string;
  totalLikes?: number;
}

export function InfoBar({ difficulty, totalLikes }: Props) {
  const difficultyColor =
    difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'yellow' : 'red';

  return (
    <Flex my="4" justify="between">
      <Flex gap="4" align="center">
        <Image src="/js.svg" height={24} width={24} alt="JavaScript" />
        <Badge color={difficultyColor} variant="solid" size="3" className="capitalize">
          {difficulty}
        </Badge>
      </Flex>

      <Flex gap="4" align="center" mr={'2'}>
        <UserSolutionStatus />
        <UserLikeStatus totalLikes={totalLikes} />
      </Flex>
    </Flex>
  );
}

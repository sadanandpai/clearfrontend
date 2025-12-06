import { DifficultyBadge } from "@/ui/components/core/difficulty-badge/difficulty-badge";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import { UserSolutionStatus } from "@/ui/components/modules/challenge/challenge-components/user-solution-status/user-solution-status";
import dynamic from "next/dynamic";

const UserLikeStatus = dynamic(
  () =>
    import(
      "@/ui/components/modules/challenge/challenge-components/user-like-status/user-like-status"
    ).then((mod) => ({ default: mod.UserLikeStatus })),
  { ssr: false },
);

interface Props {
  difficulty: string;
  totalLikes?: number;
}

export function InfoBar({ difficulty, totalLikes }: Props) {
  return (
    <Flex my="4" justify="between">
      <Flex gap="4" align="center">
        <Image src="/js.svg" height={24} width={24} alt="JavaScript" />
        <DifficultyBadge difficulty={difficulty} />
      </Flex>

      <Flex gap="4" align="center" mr={"2"}>
        <UserSolutionStatus />
        <UserLikeStatus totalLikes={totalLikes} />
      </Flex>
    </Flex>
  );
}

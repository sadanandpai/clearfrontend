import { ChallengesUI } from "@/ui/components/modules/challenges/challenges-ui";
import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import { challenges } from "@/common/challenges";
import { getUserSolvedChallenges } from "@/server/actions/user-challenge";

export default async function Challenge() {
  const solvedChallengeIds = await getUserSolvedChallenges();

  return (
    <>
      <NavBar />
      <ChallengesUI challenges={challenges} solvedChallengeIds={solvedChallengeIds} />
    </>
  );
}

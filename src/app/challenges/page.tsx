import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import { ChallengeList } from "@/ui/components/modules/challenge-list/challenge-list";
import { challenges } from "@/data/challenges";

export default async function Challenge() {
  return (
    <>
      <NavBar />
      <ChallengeList challenges={challenges} />
    </>
  );
}

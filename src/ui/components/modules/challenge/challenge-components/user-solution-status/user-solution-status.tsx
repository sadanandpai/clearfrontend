import { useContext } from "react";
import { usePathname } from "next/navigation";
import { CircleCheckBig } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { appContext } from "@/ui/context/app.context";
import { getUserChallengeInfo } from "@/server/actions/user-challenge";

export function UserSolutionStatus() {
  const { user } = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const { data: infoData } = useQuery({
    queryKey: ["userChallengeInfo", challengeId],
    queryFn: () => getUserChallengeInfo(challengeId),
    enabled: !!user,
    staleTime: Infinity,
  });

  if (!user) {
    return null;
  }

  if (infoData?.solve) {
    return (
      <span title="Solved">
        <CircleCheckBig size={24} color="green" aria-label="Solved" role="img" />
      </span>
    );
  }

  return null;
}

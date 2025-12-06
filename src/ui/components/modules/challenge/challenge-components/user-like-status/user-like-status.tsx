import { Button, Text } from "@radix-ui/themes";
import { getUserChallengeInfo, setUserChallengeLike } from "@/server/actions/user-challenge";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Heart } from "lucide-react";
import { appContext } from "@/ui/context/app.context";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

interface Props {
  totalLikes?: number;
}

export function UserLikeStatus({ totalLikes }: Props) {
  const { resolvedTheme } = useTheme();
  const { user, isLoginChecked } = useContext(appContext);
  const queryClient = useQueryClient();
  const [challengeLikes, setChallengeLikes] = useState<number | undefined>();
  const challengeId = Number(usePathname().split("/").at(-1));

  const { data: infoData, isLoading } = useQuery({
    queryKey: ["userChallengeInfo", challengeId],
    queryFn: () => getUserChallengeInfo(challengeId),
    enabled: !!user,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["userChallengeInfo", "like", challengeId],
    mutationFn: () => setUserChallengeLike(challengeId, !infoData?.like),
    onSuccess: (data) => {
      // update the cache of query (this helps to update the UI without invoking the API again)
      queryClient.setQueryData(["userChallengeInfo", challengeId], (oldData: typeof infoData) => ({
        ...oldData,
        like: data.like,
      }));

      if (data.like) {
        toast.success("Challenge is liked");
      } else {
        toast("Challenge is un-liked");
      }

      if (challengeLikes !== undefined) {
        setChallengeLikes(data.like ? challengeLikes + 1 : challengeLikes - 1);
      }
    },
    onError: () => {
      toast.error("Failed to like challenge");
    },
  });

  function handleLike() {
    if (!user) {
      toast("Please sign in to like the challenge");
      return;
    }

    if (isPending) {
      return;
    }

    mutate();
  }

  useEffect(() => {
    if (totalLikes !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChallengeLikes(totalLikes);
    }
  }, [totalLikes]);

  if (!user) {
    return (
      <Button size="1" variant="ghost" onClick={handleLike} loading={!isLoginChecked}>
        <Heart color={resolvedTheme === "dark" ? "white" : "black"} />
      </Button>
    );
  }

  return (
    <Button
      size="1"
      variant="ghost"
      loading={isLoading || isPending || infoData === undefined}
      onClick={handleLike}
    >
      <Heart
        fill={infoData?.like ? "red" : "none"}
        size={24}
        color={infoData?.like ? "red" : resolvedTheme === "dark" ? "white" : "black"}
      />
      <Text size="2">{challengeLikes}</Text>
    </Button>
  );
}

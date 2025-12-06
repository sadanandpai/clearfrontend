import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Button, Text } from "@radix-ui/themes";
import { getUserChallengeInfo, setUserChallengeLike } from "@/server/actions/user-challenge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { appContext } from "@/ui/context/app.context";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { LIKE_DEBOUNCE_TIME } from "./constant";

interface Props {
  totalLikes?: number;
}

export function UserLikeStatus({ totalLikes }: Props) {
  const { resolvedTheme } = useTheme();
  const { user, isLoginChecked } = useContext(appContext);
  const queryClient = useQueryClient();
  const [challengeLikes, setChallengeLikes] = useState<number | undefined>();
  const [localLike, setLocalLike] = useState<boolean | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const challengeId = Number(usePathname().split("/").at(-1));

  const { data: infoData, isLoading } = useQuery({
    queryKey: ["userChallengeInfo", challengeId],
    queryFn: () => getUserChallengeInfo(challengeId),
    enabled: !!user,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["userChallengeInfo", "like", challengeId],
    mutationFn: (nextLike: boolean) => setUserChallengeLike(challengeId, nextLike),
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

      setLocalLike(null);
    },
    onError: (_err, nextLike) => {
      toast.error("Failed to like challenge");
      setLocalLike(null);
      if (challengeLikes !== undefined) {
        const revert = nextLike ? -1 : +1;
        const next = challengeLikes + revert;
        setChallengeLikes(next < 0 ? 0 : next);
      }
    },
  });

  function handleLike() {
    if (!user) {
      toast("Please sign in to like the challenge");
      return;
    }

    const baseLike = localLike ?? infoData?.like ?? false;
    const nextLike = !baseLike;
    setLocalLike(nextLike);

    if (challengeLikes !== undefined) {
      const nextCount = nextLike ? challengeLikes + 1 : challengeLikes - 1;
      setChallengeLikes(nextCount < 0 ? 0 : nextCount);
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      mutate(nextLike);
    }, LIKE_DEBOUNCE_TIME);
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
        fill={(localLike ?? infoData?.like) ? "red" : "none"}
        size={24}
        color={(localLike ?? infoData?.like) ? "red" : resolvedTheme === "dark" ? "white" : "black"}
      />
      <Text size="2">{challengeLikes}</Text>
    </Button>
  );
}

"use client";

import { useContext, useEffect, useState } from "react";
import { AlertDialog, Button, Flex, IconButton, Popover, Text, TextField } from "@radix-ui/themes";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { appContext } from "@/ui/context/app.context";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { getMyShare, upsertShare } from "@/server/actions/code-shares";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { routes } from "@/common/routes";
import styles from "./share-button.module.scss";

interface Props {
  challengeId: number;
}

export function ShareButton({ challengeId }: Props) {
  const { user, isLoginChecked } = useContext(appContext);
  const userCode = useChallengeStore((state) => state.userCode);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user || !isLoginChecked) return;
    getMyShare(challengeId)
      .then((share) => {
        if (share) setShareUrl(`${window.location.origin}/challenges/${challengeId}?share=${share.$id}`);
      })
      .catch(() => {});
  }, [user, isLoginChecked, challengeId]);

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function doShare() {
    setIsSharing(true);
    setConfirmOpen(false);
    try {
      const { shareId } = await upsertShare(challengeId, userCode);
      const url = `${window.location.origin}/challenges/${challengeId}?share=${shareId}`;
      setShareUrl(url);
      copyUrl(url);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to share");
    } finally {
      setIsSharing(false);
    }
  }

  function handleShare() {
    if (shareUrl) {
      setConfirmOpen(true);
    } else {
      doShare();
    }
  }

  if (!user) {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <Button size="1" variant="ghost" aria-label="Share code">
            <Share2 size={16} />
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Text size="2">
            <RadixNextLink href={`${routes.signIn}?redirect=${routes.challenges}/${challengeId}`}>
              Sign in
            </RadixNextLink>{" "}
            to share your code
          </Text>
        </Popover.Content>
      </Popover.Root>
    );
  }

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <Button size="1" variant="ghost" aria-label="Share code">
            <Share2 size={16} />
          </Button>
        </Popover.Trigger>
        <Popover.Content width="340px">
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium">Share your code</Text>
            <Flex gap="2" align="center">
              <TextField.Root
                readOnly
                value={shareUrl ?? "Click below to generate a share link"}
                onChange={() => {}}
                size="2"
                className={styles.urlInput}
              />
              {shareUrl && (
                <IconButton
                  size="2"
                  variant="soft"
                  onClick={() => copyUrl(shareUrl)}
                  aria-label="Copy link"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </IconButton>
              )}
            </Flex>
            <Button onClick={handleShare} loading={isSharing} size="2">
              {shareUrl ? "Regenerate share link" : "Generate share link"}
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title>Replace existing share link?</AlertDialog.Title>
          <AlertDialog.Description>
            Creating a new link will make the old one stop working.
          </AlertDialog.Description>
          <Flex gap="3" justify="end" mt="4">
            <Button variant="soft" color="gray" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={doShare} loading={isSharing}>
              Replace
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

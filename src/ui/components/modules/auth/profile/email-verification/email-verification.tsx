"use client";

import { useContext } from "react";
import { toast } from "sonner";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmailAction } from "@/server/actions/user";
import { appContext } from "@/ui/context/app.context";

interface Props {
  emailVerification: boolean;
}

export function EmailVerification({ emailVerification }: Props) {
  const { resetLoggedInUser } = useContext(appContext);

  const { mutate, data, isPending } = useMutation({
    mutationFn: sendVerificationEmailAction,
    onSuccess: async (response) => {
      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.message) {
        toast.success(response.message);
      }

      await resetLoggedInUser();
    },
  });

  if (emailVerification) {
    return null;
  }

  return (
    <Button
      onClick={() => mutate()}
      loading={isPending}
      disabled={!!data?.message}
      title={data?.message ? "Verification email sent" : "Click to send verification email"}
    >
      Send verification email
    </Button>
  );
}

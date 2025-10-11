"use client";

import { toast } from "sonner";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmailAction } from "@/server/actions/user";

interface Props {
  emailVerification: boolean;
}

export function EmailVerification({ emailVerification }: Props) {
  const { mutate, data, isPending } = useMutation({
    mutationFn: sendVerificationEmailAction,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
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

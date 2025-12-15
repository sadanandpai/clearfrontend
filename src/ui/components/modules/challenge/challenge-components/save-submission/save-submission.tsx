import { Button } from "@radix-ui/themes";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { appContext } from "@/ui/context/app.context";
import { collapseWhiteSpace } from "collapse-white-space";
import { routes } from "@/common/routes";
import strip from "strip-comments";
import { submitUserSubmission } from "@/server/actions/submissions";
import { toast } from "sonner";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

interface SubmissionMutationProps {
  challengeId: number;
  code: string;
  status: boolean;
}

interface Props {
  status?: boolean;
  disabled?: boolean;
  onSubmit?: () => void;
  submittedCode: string;
}

export function SaveSubmission({ status, onSubmit, disabled, submittedCode }: Props) {
  const { user } = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const { mutate, isPending } = useMutation({
    mutationFn: ({ challengeId, code, status }: SubmissionMutationProps) =>
      submitUserSubmission(challengeId, collapseWhiteSpace(strip(code)), status),
    onSuccess: () => {
      onSubmit?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function saveSubmission() {
    if (status !== undefined && !isPending) {
      mutate({ challengeId, code: submittedCode, status });
    }
  }

  if (!user) {
    return (
      <p>
        Please&nbsp;
        <RadixNextLink href={`${routes.signIn}?redirect=${routes.challenges}/${challengeId}`}>
          Sign in
        </RadixNextLink>
        &nbsp;to save your submission
      </p>
    );
  }

  if (!user.emailVerification) {
    return (
      <p>
        Please&nbsp;
        <RadixNextLink href={routes.profile}>verify your email</RadixNextLink>
        &nbsp;to save your submission
      </p>
    );
  }

  return (
    <Button onClick={saveSubmission} disabled={disabled || isPending} loading={isPending}>
      Save Submission
    </Button>
  );
}

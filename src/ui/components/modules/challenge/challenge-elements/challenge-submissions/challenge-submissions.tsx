import { useContext } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { routes } from "@/common/routes";
import { appContext } from "@/ui/context/app.context";
import { SubmissionsTable } from "@/ui/components/core/submissions-table/submissions-table";
import { deleteUserSubmission, getUserSubmissions } from "@/server/actions/submissions";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import classes from "./challenge-submissions.module.scss";
import { Spinner } from "@radix-ui/themes";

interface SubmissionMutationProp {
  submissionId: string;
}

export function ChallengeSubmissions() {
  const queryClient = useQueryClient();
  const context = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const {
    isLoading: isRecordsLoading,
    data: submissionsData,
    error: submissionsError,
  } = useQuery({
    queryKey: ["submissions", challengeId],
    queryFn: () => getUserSubmissions(challengeId),
    enabled: !!context.user,
    staleTime: Infinity,
  });

  const { mutate, isPending: isDeletionPending } = useMutation({
    mutationFn: ({ submissionId }: SubmissionMutationProp) => deleteUserSubmission(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions", challengeId] });
      toast.success("Submission deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete submission");
    },
  });

  async function deleteSubmission(submissionId: string) {
    if (submissionId !== undefined) {
      mutate({ submissionId });
    }
  }

  if (!context.user) {
    return (
      <p className={classes.verticalCenter}>
        Please&nbsp;
        <RadixNextLink href={`${routes.signIn}?redirect=${routes.challenges}/${challengeId}`}>
          Sign in
        </RadixNextLink>
        &nbsp;to view your submissions
      </p>
    );
  }

  if (submissionsError) {
    return (
      <div className={classes.verticalCenter}>
        <p>Failed to load submissions</p>
      </div>
    );
  }

  if (isRecordsLoading) {
    return (
      <div className={classes.verticalCenter}>
        <Spinner />
      </div>
    );
  }

  if (!submissionsData?.documents?.length) {
    return (
      <div className={classes.verticalCenter}>
        <p>You have not submitted any code yet</p>
      </div>
    );
  }

  return (
    <SubmissionsTable
      records={submissionsData.documents}
      deleteSubmission={deleteSubmission}
      isLoading={isDeletionPending}
    />
  );
}

"use client";

import { useActionState, useEffect, useState } from "react";
import { routes } from "@/common/routes";
import { Button } from "@radix-ui/themes";
import { ErrorField } from "@/ui/components/common/form/error-field";
import { EmailField } from "@/ui/components/common/form/input-fields";
import classes from "./forgot-password.module.scss";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { toast } from "sonner";
import { forgotPassword } from "@/server/actions/user";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [state, formAction, pending] = useActionState(forgotPassword, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <EmailField value={email} setValue={setEmail} />
          <ErrorField error={state.fieldErrors?.email?.[0]} />
        </div>

        <Button type="submit" loading={pending}>
          Get reset link
        </Button>
        <ErrorField error={state.error} />
      </form>

      <div className={classes.authFormLinks}>
        <RadixNextLink href={routes.signIn}>Sign in</RadixNextLink>
        <RadixNextLink href={routes.signUp}>Sign up</RadixNextLink>
      </div>
    </div>
  );
}

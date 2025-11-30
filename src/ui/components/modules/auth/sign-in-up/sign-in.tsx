"use client";

import { EmailField, PasswordField } from "@/ui/components/common/form/input-fields";
import { useActionState, useState } from "react";

import { Button } from "@radix-ui/themes";
import { ErrorField } from "@/ui/components/common/form/error-field";
import { OAuth } from "@/ui/components/modules/auth/oauth/oauth";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import classes from "./sign-in-up.module.scss";
import { routes } from "@/common/routes";
import { signInWithEmail } from "@/server/actions/auth";
import { useSearchParams } from "next/navigation";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [state, formAction, pending] = useActionState(signInWithEmail, {});

  const params = useSearchParams();
  const redirectURL = params.get("redirect");
  const redirectQuery = redirectURL ? `?redirect=${redirectURL}` : "";

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <EmailField value={email} setValue={setEmail} />
          <ErrorField error={state.fieldErrors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.fieldErrors?.password?.[0]} />
        </div>

        <Button type="submit" loading={pending}>
          Sign in
        </Button>
        <ErrorField error={state.error} />
      </form>

      <div className={classes.authFormLinks}>
        <RadixNextLink href={routes.forgotPassword}>Forgot password?</RadixNextLink>
        <RadixNextLink href={`${routes.signUp}${redirectQuery}`}>Sign up</RadixNextLink>
      </div>

      <OAuth />
    </div>
  );
}

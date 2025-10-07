'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { routes } from '@/common/routes';
import { Button } from '@radix-ui/themes';
import { ErrorField } from '@/ui/components/common/form/error-field';
import { PasswordField } from '@/ui/components/common/form/input-fields';
import { RadixNextLink } from '@/ui/components/core/radix-next-link/radix-next-link';
import { redirect, RedirectType, useSearchParams } from 'next/navigation';
import classes from './reset-password.module.scss';
import { resetForgotPassword } from '@/server/actions/user';

export function ResetPassword() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [state, formAction, pending] = useActionState(resetForgotPassword, {});
  const [formError, setFormError] = useState('');

  function onSubmit(event: React.FormEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      event.preventDefault();
      setFormError('Passwords do not match');
      return;
    }
  }

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
      redirect(routes.signIn, RedirectType.replace);
    }
  }, [state]);

  if (!userId || !secret) {
    return (
      <div className={classes.authFormWrapper}>
        <h1>Invalid reset link</h1>
      </div>
    );
  }

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm} onSubmit={onSubmit}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="secret" value={secret} />

        <div className="form-field">
          <PasswordField field="newPassword" placeHolder="New Password" />
          <ErrorField error={state.fieldErrors?.newPassword?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField field="confirmPassword" placeHolder="Confirm Password" />
          <ErrorField error={state.fieldErrors?.confirmPassword?.[0]} />
        </div>

        <Button type="submit" loading={pending}>
          Reset Password
        </Button>
        <ErrorField
          error={
            state.error ||
            state.fieldErrors?.userId?.[0] ||
            state.fieldErrors?.secret?.[0] ||
            formError
          }
        />
      </form>

      <div className={classes.authFormLinks}>
        <RadixNextLink href={routes.signIn}>Sign in</RadixNextLink>
        <RadixNextLink href={routes.signUp}>Sign up</RadixNextLink>
      </div>
    </div>
  );
}

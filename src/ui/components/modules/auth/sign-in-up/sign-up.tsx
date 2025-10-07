'use client';

import { useActionState, useState } from 'react';
import { routes } from '@/common/routes';
import { Button } from '@radix-ui/themes';
import { signUpWithEmail } from '@/server/actions/auth';
import { OAuth } from '@/ui/components/modules/auth/oauth/oauth';
import { ErrorField } from '@/ui/components/common/form/error-field';
import { EmailField, FullNameField, PasswordField } from '@/ui/components/common/form/input-fields';
import { RadixNextLink } from '@/ui/components/core/radix-next-link/radix-next-link';
import classes from './sign-in-up.module.scss';
import { useSearchParams } from 'next/navigation';

export function SignUp() {
  const params = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, formAction, pending] = useActionState(signUpWithEmail, {});

  const redirectURL = params.get('redirect');
  const redirectQuery = redirectURL ? `?redirect=${redirectURL}` : '';

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <FullNameField setValue={setName} value={name} />
          <ErrorField error={state.fieldErrors?.name?.[0]} />
        </div>

        <div className="form-field">
          <EmailField setValue={setEmail} value={email} />
          <ErrorField error={state.fieldErrors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.fieldErrors?.password?.[0]} />
        </div>

        <Button type="submit" loading={pending}>
          Sign up
        </Button>
        <ErrorField error={state.error} />
      </form>

      <div className={classes.authFormLinks}>
        <RadixNextLink href={`${routes.signIn}${redirectQuery}`}>Sign in</RadixNextLink>
      </div>

      <OAuth />
    </div>
  );
}

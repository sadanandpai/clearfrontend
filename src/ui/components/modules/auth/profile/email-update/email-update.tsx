'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { EmailField, PasswordField } from '@/ui/components/common/form/input-fields';
import { Button, Flex } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';
import { updateEmail } from '@/server/actions/user';
import { ErrorField } from '@/ui/components/common/form/error-field';
import { VerificationBadge } from '@/ui/components/core/verification-badge/verification-badge';
import classes from '../profile.module.scss';

interface Props {
  email: string;
  emailVerification: boolean;
}

export function EmailUpdate({ email, emailVerification }: Props) {
  const [userEmail, setUserEmail] = useState(email);
  const [inputEmail, setInputEmail] = useState(email);
  const [isVerified, setIsVerified] = useState(emailVerification);
  const [state, formAction, pending] = useActionState(updateEmail, {});

  useEffect(() => {
    if (state.message) {
      setIsVerified(false);
      setUserEmail(inputEmail);
      toast.success(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Flex gap="2" align="center">
        <Label htmlFor="email">Email</Label>
        <VerificationBadge isVerified={isVerified} />
      </Flex>

      <div>
        <EmailField value={inputEmail} setValue={setInputEmail} />
        <ErrorField error={state.fieldErrors?.name?.[0]} />
      </div>

      <div>
        <PasswordField disabled={inputEmail === userEmail} />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <Button type="submit" loading={pending} disabled={pending || inputEmail === userEmail}>
          Update Email
        </Button>
      </div>
    </form>
  );
}

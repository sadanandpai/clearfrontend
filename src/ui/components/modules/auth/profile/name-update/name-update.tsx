'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';
import { FullNameField } from '@/ui/components/common/form/input-fields';
import { ErrorField } from '@/ui/components/common/form/error-field';
import { updateName } from '@/server/actions/user';
import classes from '../profile.module.scss';

interface Props {
  name: string;
}

export function NameUpdate({ name }: Props) {
  const [userName, setUserName] = useState(name);
  const [inputName, setInputName] = useState(name);
  const [state, formAction, pending] = useActionState(updateName, {});

  useEffect(() => {
    if (state.status === 'success') {
      setUserName(inputName);
      toast.success(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Label htmlFor="name">Full name</Label>
      <div>
        <FullNameField value={inputName} setValue={setInputName} disabled={pending} />
        <ErrorField error={state.fieldErrors?.name?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <Button type="submit" loading={pending} disabled={pending || inputName === userName}>
          Update Name
        </Button>
      </div>
    </form>
  );
}

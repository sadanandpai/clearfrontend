'use client';

import { toast } from 'sonner';
import { Button } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { sendPhoneVerificationAction } from '@/server/actions/user';

interface Props {
  phone: string;
  phoneVerification: boolean;
}

export function PhoneVerification({ phone, phoneVerification }: Props) {
  const { mutate, data, isPending } = useMutation({
    mutationFn: sendPhoneVerificationAction,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!phone || phoneVerification) {
    return null;
  }

  return (
    <Button
      onClick={() => mutate()}
      loading={isPending}
      disabled={!!data?.message}
      title={data?.message ? 'Verification SMS sent' : 'Click to send verification SMS'}
    >
      Send verification SMS
    </Button>
  );
}

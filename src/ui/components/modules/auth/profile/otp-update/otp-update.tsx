import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { verifyPhone } from '@/server/actions/user';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { ErrorField } from '@/ui/components/common/form/error-field';
import { UserOTPInput } from '@/ui/components/core/user-input-otp/input-otp';
import { appContext } from '@/ui/context/app.context';

export function OTPUpdate() {
  const { resetLoggedInUser } = useContext(appContext);
  const [otp, setOTP] = useState('');
  const [open, setOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { mutate, error, isPending } = useMutation({
    mutationFn: () => verifyPhone(otp),
    onSuccess: (response) => {
      setOpen(false);
      resetLoggedInUser();
      toast.success(response.message);
    },
  });

  function onOpenChange(isOpen: boolean) {
    if (isOpen) {
      setValidationError('');
    }
    setOpen(isOpen);
  }

  function onOTPChange(otp: string) {
    if (/^[0-9]+$/.test(otp)) {
      setValidationError('');
    }

    setOTP(otp);
  }

  function handleSubmit() {
    if (otp.length === 6 && /^[0-9]+$/.test(otp) && !isPending) {
      mutate();
    } else {
      setValidationError('OTP should contain only numbers with 6 digits');
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button type="button">Verify phone with OTP</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Enter OTP code received on your phone</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <Text>
            We have sent a 6-digit code to your phone number. Please enter the code below.
          </Text>
        </Dialog.Description>

        <Flex justify="center" align="center" direction="column" gap="4">
          <UserOTPInput maxLength={6} onChange={onOTPChange} />
          <ErrorField error={error?.message || validationError} />
          <Button type="submit" loading={isPending} onClick={handleSubmit} className="mt-8">
            Verify
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

"use client";

import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";
import { Button, Flex } from "@radix-ui/themes";
import { PasswordField, PhoneField } from "@/ui/components/common/form/input-fields";
import { updatePhone } from "@/server/actions/user";
import { appContext } from "@/ui/context/app.context";
import { ErrorField } from "@/ui/components/common/form/error-field";
import { OTPUpdate } from "@/ui/components/modules/auth/profile/otp-update/otp-update";
import { VerificationBadge } from "@/ui/components/core/verification-badge/verification-badge";
import classes from "../profile.module.scss";

interface Props {
  phone: string;
  phoneVerification: boolean;
}

export function PhoneUpdate({ phone, phoneVerification }: Props) {
  const { resetLoggedInUser } = useContext(appContext);
  const [userPhone, setUserPhone] = useState(phone);
  const [inputPhone, setInputPhone] = useState(phone);
  const [isVerified, setIsVerified] = useState(phoneVerification);
  const [state, formAction, pending] = useActionState(updatePhone, {});

  useEffect(() => {
    if (state.status === "success") {
      resetLoggedInUser();
      setUserPhone(inputPhone);
      setIsVerified(false);
      toast.success(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    setIsVerified(phoneVerification);
  }, [phoneVerification]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Flex gap="2" align="center">
        <Label htmlFor="phone">Phone</Label>
        <VerificationBadge isVerified={isVerified} />
      </Flex>

      <div>
        <PhoneField value={inputPhone} setValue={setInputPhone} />
        <ErrorField error={state.fieldErrors?.phone?.[0]} />
      </div>

      <div>
        <PasswordField field="userPassword" disabled={userPhone === inputPhone} />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <Flex gap="2">
          {!isVerified && userPhone && userPhone === inputPhone && <OTPUpdate />}
          <Button type="submit" loading={pending} disabled={userPhone === inputPhone}>
            Update Phone
          </Button>
        </Flex>
      </div>
    </form>
  );
}

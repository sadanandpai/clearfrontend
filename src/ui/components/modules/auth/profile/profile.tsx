"use client";

import { useContext } from "react";
import { Models } from "node-appwrite";
import { signOut } from "@/server/actions/auth";
import { Button, Flex } from "@radix-ui/themes";
import { NameUpdate } from "./name-update/name-update";
import { EmailUpdate } from "./email-update/email-update";
// import { PhoneUpdate } from "./phone-update/phone-update";
import { PasswordUpdate } from "./password-update/password-update";
import { EmailVerification } from "@/ui/components/modules/auth/profile/email-verification/email-verification";
import { PhoneVerification } from "@/ui/components/modules/auth/profile/phone-verification/phone-verification";
import { appContext } from "@/ui/context/app.context";
import classes from "./profile.module.scss";

interface Props {
  user: Models.User<Models.Preferences>;
}

export function Profile({ user: serverUser }: Props) {
  const { user: contextUser } = useContext(appContext);
  const user = contextUser ?? serverUser;

  return (
    <main className={classes.main}>
      <NameUpdate name={user.name} />
      <PasswordUpdate />
      <EmailUpdate email={user.email} emailVerification={user.emailVerification} />
      {/* <PhoneUpdate phone={user.phone} phoneVerification={user.phoneVerification} /> */}

      <Flex gap="2">
        <EmailVerification emailVerification={user.emailVerification} />
        <PhoneVerification phone={user.phone} phoneVerification={user.phoneVerification} />

        <form action={signOut}>
          <Button type="submit" color="tomato">
            Sign out
          </Button>
        </form>
      </Flex>
    </main>
  );
}

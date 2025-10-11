import { redirect, RedirectType } from "next/navigation";
import { SignUp } from "@/ui/components/modules/auth/sign-in-up/sign-up";
import { getLoggedInUser } from "@/server/actions/auth";
import { routes } from "@/common/routes";
import { getParams } from "@/server/utils/url";

export default async function SignUpPage() {
  const user = await getLoggedInUser();

  if (user) {
    const redirectURL = await getParams("redirect");
    if (redirectURL) {
      return redirect(`${redirectURL}?auth=true`, RedirectType.replace);
    }
    return redirect(`${routes.profile}?auth=true`, RedirectType.replace);
  }

  return <SignUp />;
}

import { redirect } from "next/navigation";
import { SignIn } from "@/ui/components/auth/sign-in";
import { getLoggedInUser } from "@/server/actions/auth";
import { routes } from "@/common/routes";

export default async function SignInPage() {
  const user = await getLoggedInUser();

  if (user) {
    redirect(routes.profile);
  }

  return <SignIn />;
}
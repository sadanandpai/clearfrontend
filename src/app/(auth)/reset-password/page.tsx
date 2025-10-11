import { redirect } from "next/navigation";
import { routes } from "@/common/routes";
import { getLoggedInUser } from "@/server/actions/auth";
import { ResetPassword } from "@/ui/components/modules/auth/reset-password/reset-password";

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  const user = await getLoggedInUser();

  if (user) {
    redirect(routes.profile);
  }

  return <ResetPassword />;
}

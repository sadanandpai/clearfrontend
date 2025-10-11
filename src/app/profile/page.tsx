import { redirect } from "next/navigation";
import { routes } from "@/common/routes";
import { Profile } from "@/ui/components/modules/auth/profile/profile";
import { getLoggedInUser } from "@/server/actions/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect(`${routes.signIn}?auth=false`);
  }

  return <Profile user={user} />;
}

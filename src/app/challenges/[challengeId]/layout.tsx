import { routes } from "@/common/routes";
import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import classes from "./challenge.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.bodyWrapper}>
      <NavBar>
        <RadixNextLink href={routes.challenges}>All Challenges</RadixNextLink>
      </NavBar>
      <div className={classes.bodyContent}>{children}</div>
    </div>
  );
}

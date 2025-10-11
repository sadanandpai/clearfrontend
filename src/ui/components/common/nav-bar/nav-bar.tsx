import { routes } from "@/common/routes";
import { ThemeSwitch } from "@/ui/components/common/theme-switch/theme-switch";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import classes from "./nav-bar.module.scss";
import { Flex } from "@radix-ui/themes";
import { CircleUser } from "lucide-react";

export function NavBar({ children }: React.PropsWithChildren) {
  return (
    <nav className={classes.navBar} role="navigation">
      <RadixNextLink href={routes.root} size="6" weight="bold">
        ClearFrontend
      </RadixNextLink>

      {children}

      <Flex gap="4">
        <ThemeSwitch />
        <RadixNextLink href={routes.profile}>
          <CircleUser />
        </RadixNextLink>
      </Flex>
    </nav>
  );
}

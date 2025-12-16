"use client";
import { routes } from "@/common/routes";
import { ThemeSwitch } from "@/ui/components/common/theme-switch/theme-switch";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import classes from "./nav-bar.module.scss";
import { Flex } from "@radix-ui/themes";
import { CircleUser } from "lucide-react";
import { FeedbackButton } from "../feedback/feedback-button";
import { usePathname } from "next/navigation";

export function NavBar({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  return (
    <nav className={classes.navBar} role="navigation">
      <RadixNextLink href={routes.root} size="6" weight="bold">
        ClearFrontend
      </RadixNextLink>

      {children}

      <Flex gap="4">
        {pathname !== "/" && <FeedbackButton />}

        <ThemeSwitch />
        <RadixNextLink href={routes.profile}>
          <CircleUser />
        </RadixNextLink>
      </Flex>
    </nav>
  );
}

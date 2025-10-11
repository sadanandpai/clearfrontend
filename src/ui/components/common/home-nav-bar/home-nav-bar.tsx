import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { MenuDropdown } from "./menu-dropdown";
import classes from "./home-nav-bar.module.scss";
import { routes } from "@/common/routes";

export function HomeNavBar() {
  return (
    <nav className={classes.navbar} role="navigation">
      <Flex align="center" gap="5">
        <Image src="/cfe-logo.svg" alt="Github" width={36} height={36} />

        <Link href={routes.challenges} className="text-brand-1 font-bold hidden md:flex">
          Challenges
        </Link>

        <Link
          href="https://github.com/sadanandpai/clearfrontend"
          target="blank"
          className="text-brand-1 font-bold hidden md:flex"
        >
          Contribute
        </Link>
      </Flex>
      <Flex align="center" gap="5" className="hidden lg:flex">
        <Link href={routes.signIn} className="secondary-link">
          LOGIN
        </Link>

        <Link href={routes.signUp} className="primary-link">
          SIGN UP
        </Link>

        <Link href="https://github.com/sadanandpai/clearfrontend" target="blank">
          <Image src="/github.svg" alt="Github" width={32} height={32} />
        </Link>
      </Flex>
      <MenuDropdown />
    </nav>
  );
}

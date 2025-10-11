import Image from "next/image";
import { Flex } from "@radix-ui/themes";
import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import classes from "./auth.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="body-wrapper">
      <NavBar />
      <section className={classes.authSection}>
        <Flex justify="center" className="mb-16">
          <Image src="/cfe-logo.svg" alt="Brand logo" width={60} height={60} />
        </Flex>
        {children}
      </section>
    </div>
  );
}

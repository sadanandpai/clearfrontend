import { Circles } from "@/ui/components/core/circles/circles";
import { Features } from "@/ui/components/modules/home/features/features";
import { Flex } from "@radix-ui/themes";
import { GetStarted } from "@/ui/components/modules/home/get-started";
import { Hero } from "@/ui/components/modules/home/hero";
import { HomeNavBar } from "@/ui/components/common/home-nav-bar/home-nav-bar";
import { Practice } from "@/ui/components/modules/home/practice";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="container">
        <Circles />
        <HomeNavBar />

        <Flex direction="column" className="mt-[84px] relative gap-[130px] lg:gap-[260px]">
          <Hero />
          <Practice />
          <Features />
          <GetStarted />
        </Flex>
      </div>
    </div>
  );
}

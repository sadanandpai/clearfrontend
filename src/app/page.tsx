import { Flex } from "@radix-ui/themes";
import { Hero } from "@/ui/components/modules/home/hero";
import { Circles } from "@/ui/components/core/circles/circles";
import { Practice } from "@/ui/components/modules/home/practice";
import { Features } from "@/ui/components/modules/home/features/features";
import { GetStarted } from "@/ui/components/modules/home/get-started";
import { HomeNavBar } from "@/ui/components/common/home-nav-bar/home-nav-bar";

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

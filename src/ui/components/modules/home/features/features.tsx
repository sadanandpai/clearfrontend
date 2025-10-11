"use client";

import { Fragment, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { FeatureItems } from "@/ui/components/core/feature-items/feature-items";
import { EmblaCarousel } from "@/ui/components/core/carousel/carousel";
import classes from "./features.module.scss";

const listItems = [
  { title: "Challenge", img: "https://via.placeholder.com/150" },
  { title: "Code", img: "https://via.placeholder.com/150" },
  { title: "Run or debug", img: "https://via.placeholder.com/150" },
  { title: "Dark or light", img: "https://via.placeholder.com/150" },
];

export function Features() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section>
      <p className={`${classes.sectionTitle} mb-[54px]`}>All in one platform</p>

      <div className="hidden lg:block">
        <Flex justify="between" gap="9" align="center">
          <div className="flex-1">
            <FeatureItems
              listItems={listItems.map((item) => item.title)}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>

          <div className={classes.featureCard}></div>
        </Flex>
      </div>

      <div className="lg:hidden">
        <EmblaCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          {listItems.map((item) => (
            <Fragment key={item.title}>
              <p className={classes.featureTitle}>{item.title}</p>
              <div className={classes.featureCard}></div>
            </Fragment>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
}

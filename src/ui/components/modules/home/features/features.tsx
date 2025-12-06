"use client";

import { Fragment, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { FeatureItems } from "@/ui/components/core/feature-items/feature-items";
import { EmblaCarousel } from "@/ui/components/core/carousel/carousel";
import classes from "./features.module.scss";
import Image from "next/image";

const listItems = [
  { title: "Challenge", img: "/challenge.webp" },
  { title: "Code", img: "/code.webp" },
  { title: "Run or debug", img: "/run-or-debug.webp" },
  { title: "Dark or light", img: "/dark-or-light.webp" },
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

          <div className={classes.featureCard}>
            <Image
              src={listItems[activeIndex].img}
              alt={listItems[activeIndex].title}
              fill
              sizes="(max-width: 1024px) 0px, 618px"
              className="object-contain"
            />
          </div>
        </Flex>
      </div>

      <div className="lg:hidden">
        <EmblaCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          {listItems.map((item) => (
            <Fragment key={item.title}>
              <p className={classes.featureTitle}>{item.title}</p>
              <div className={classes.featureCard}>
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 0px"
                  className="object-contain"
                />
              </div>
            </Fragment>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
}

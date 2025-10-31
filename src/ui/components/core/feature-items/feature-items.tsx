"use client";

import { Fragment } from "react";
import { Flex } from "@radix-ui/themes";
import classes from "./feature-items.module.scss";

interface Props {
  listItems: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
}

export const FeatureItems = ({ listItems, activeIndex, setActiveIndex }: Props) => {
  return (
    <Flex direction="column" gap="5">
      {listItems.map((item, index) => (
        <Fragment key={index}>
          <p
            className={`${classes.contentTitle} cursor-pointer ${activeIndex === index ? classes.active : ""}`}
            role="button"
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item} &gt;
          </p>
          <hr
            style={{
              borderTop: "0.5px solid #C0D1CA80",
            }}
          />
        </Fragment>
      ))}
    </Flex>
  );
};

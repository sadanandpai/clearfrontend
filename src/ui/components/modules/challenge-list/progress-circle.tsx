"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import { CircularProgressSvg } from "./circular-progress-svg";

interface Props {
  solved: number;
  total: number;
}

export const ProgressCircle = ({ solved, total }: Props) => {
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <Card style={{ padding: "1rem", minWidth: "12.5rem", height: "100%" }}>
      <Flex direction="column" align="center" justify="center" gap="2" style={{ height: "100%" }}>
        <Text size="2" weight="medium" color="gray">
          Overall Progress
        </Text>

        <div
          style={{
            position: "relative",
            width: "96px",
            height: "96px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgressSvg percentage={percentage} size={96} strokeWidth={8} />

          {/* Center text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Text size="6" weight="bold" style={{ lineHeight: 1 }}>
              {percentage}%
            </Text>
          </div>
        </div>

        {/* Stats text */}
        <Text size="2" color="gray">
          {solved} / {total}
        </Text>

        {percentage === 100 && (
          <Text size="2" weight="bold" style={{ color: "#22c55e" }}>
            🎉 Complete!
          </Text>
        )}
      </Flex>
    </Card>
  );
};
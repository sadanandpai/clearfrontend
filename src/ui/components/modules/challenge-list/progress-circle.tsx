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
    <Card style={{ padding: "24px 20px", minWidth: 200 }}>
      <Flex direction="column" align="center" gap="2">
        <Text size="2" weight="medium" color="gray" style={{ marginBottom: 4 }}>
          Overall Progress
        </Text>

        <div style={{ position: "relative", width: 140, height: 140 }}>
          <CircularProgressSvg percentage={percentage} />

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
            <Text size="8" weight="bold" style={{ fontSize: 42, lineHeight: 1 }}>
              {percentage}%
            </Text>
            <Text size="2" color="gray" style={{ display: "block", marginTop: 4 }}>
              Complete
            </Text>
          </div>
        </div>

        {/* Stats text */}
        <Text size="2" color="gray" style={{ marginTop: 4 }}>
          {solved} / {total} challenges
        </Text>
        
        {percentage === 100 && (
          <Text size="2" weight="bold" style={{ color: "#22c55e", marginTop: 4 }}>
            🎉 All Complete!
          </Text>
        )}
      </Flex>
    </Card>
  );
};
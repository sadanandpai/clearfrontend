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
    <Card className="p-4 min-w-[12.5rem]">
      <Flex direction="column" align="center" justify="center" gap="2">
        <Text size="2" weight="medium" color="gray">
          Overall Progress
        </Text>

        <div className="relative w-24 h-24 flex justify-center items-center">
          <CircularProgressSvg percentage={percentage} size={96} strokeWidth={8} />

          {/* Center text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Text size="6" weight="bold" className="leading-none">
              {percentage}%
            </Text>
          </div>
        </div>

        {/* Stats text */}
        <Text size="2" color="gray">
          {solved} / {total}
        </Text>

        {percentage === 100 && (
          <Text size="2" weight="bold" className="text-green-500">
            🎉 Complete!
          </Text>
        )}
      </Flex>
    </Card>
  );
};
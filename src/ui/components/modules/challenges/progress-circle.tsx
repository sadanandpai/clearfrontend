"use client";

import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  solved: number;
  total: number;
}

export const ProgressCircle = ({ solved, total }: Props) => {
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card style={{ padding: "24px 20px", minWidth: 200 }}>
      <Flex direction="column" align="center" gap="2">
        <Text size="2" weight="medium" color="gray" style={{ marginBottom: 4 }}>
          Overall Progress
        </Text>
        
        {/* SVG Circle */}
        <div style={{ position: "relative", width: 140, height: 140 }}>
          <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke={percentage === 100 ? "#22c55e" : "#3b82f6"}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.5s ease",
              }}
            />
          </svg>
          
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
"use client";

import { Spinner, Text } from "@radix-ui/themes";

interface ChallengePageLoaderProps {
  message?: string;
}

export function ChallengePageLoader({ message = "Loading challenge…" }: ChallengePageLoaderProps) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center justify-center gap-3 px-4">
      <Spinner size="3" />
      <Text as="p" size="2" color="gray" align="center">
        {message}
      </Text>
    </div>
  );
}

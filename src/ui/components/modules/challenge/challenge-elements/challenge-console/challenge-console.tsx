import { Button, ScrollArea } from "@radix-ui/themes";
import { useChallengeStore } from "@/ui/store/challenge.store";

export function ChallengeConsole() {
  const consoleLogs = useChallengeStore((state) => state.consoleLogs);
  const resetConsoleLogs = useChallengeStore((state) => state.resetConsoleLogs);

  return (
    <>
      <ScrollArea className="h-full font-mono text-sm p-2">
        {consoleLogs.length === 0 ? (
          <p className="text-center mt-4 text-gray-400">No console output</p>
        ) : (
          consoleLogs.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words py-0.5">
              {line}
            </div>
          ))
        )}
      </ScrollArea>
      <Button onClick={resetConsoleLogs} className="absolute right-4 bottom-4">
        Clear
      </Button>
    </>
  );
}

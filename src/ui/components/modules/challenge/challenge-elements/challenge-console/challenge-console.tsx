import { useRef } from "react";
import { Button } from "@radix-ui/themes";
import { SandpackConsole } from "@codesandbox/sandpack-react/unstyled";

interface SandpackConsoleRef {
  reset: () => void;
}

export function ChallengeConsole() {
  const consoleRef = useRef<SandpackConsoleRef | null>(null);

  function onClear() {
    consoleRef.current?.reset();
  }

  return (
    <>
      <SandpackConsole
        ref={consoleRef}
        showSyntaxError={false}
        showResetConsoleButton={false}
        resetOnPreviewRestart={true}
      />
      <Button onClick={onClear} className="absolute right-4 bottom-4">
        Clear
      </Button>
    </>
  );
}

import React from "react";
import { SandpackTests } from "@codesandbox/sandpack-react/unstyled";

export function TestRunner() {
  return (
    <SandpackTests
      style={{ display: "none" }}
      watchMode={false}
      showWatchButton={false}
      showVerboseButton={false}
      hideTestsAndSupressLogs={true}
    />
  );
}

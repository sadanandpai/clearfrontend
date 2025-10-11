import { SandpackCodeEditor } from "@codesandbox/sandpack-react/unstyled";

export function SandpackEditor() {
  return (
    <SandpackCodeEditor
      showRunButton={false}
      showInlineErrors={true}
      showLineNumbers={true}
      showTabs={true}
      style={{ height: "100%" }}
    />
  );
}

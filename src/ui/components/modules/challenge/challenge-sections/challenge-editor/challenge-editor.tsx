import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MonacoEditor } from "@/ui/components/core/editor/monaco-editor";
import { TestRunner } from "@/ui/components/core/test-runner/test-runner";
import { Executor } from "@/ui/components/modules/challenge/challenge-components/executor/executor";
import { EditorControls } from "@/ui/components/modules/challenge/challenge-components/editor-controls/editor-controls";

interface Props {
  defaultCode: string;
}

export function ChallengeEditor({ defaultCode }: Props) {
  const challengeId = Number(usePathname().split("/").at(-1));

  const [fontSize, setFontSize] = useState(16);
  const editorRef = useRef<{
    updateCode: (code: string) => void;
  }>(null);

  return (
    <div className="panel-layout">
      <EditorControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        onReset={() => editorRef.current?.updateCode(defaultCode)}
      />
      <MonacoEditor fontSize={fontSize} challengeId={challengeId} ref={editorRef} />
      <TestRunner />
      <Executor />
    </div>
  );
}

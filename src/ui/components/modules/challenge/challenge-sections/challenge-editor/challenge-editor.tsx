import { useRef, useState } from "react";

import { EditorControls } from "@/ui/components/modules/challenge/challenge-components/editor-controls/editor-controls";
import { Executor } from "@/ui/components/modules/challenge/challenge-components/executor/executor";
import { MonacoEditor } from "@/ui/components/core/editor/monaco-editor";
import { Spinner } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

interface Props {
  defaultCode: string;
  isLoading: boolean;
  testCode: (arg: string) => string;
  testCases: string;
  solution: string;
  sharedCode?: string;
}

export function ChallengeEditor({ defaultCode, isLoading, testCode, testCases, solution, sharedCode }: Props) {
  const challengeId = Number(usePathname().split("/").at(-1));

  const [fontSize, setFontSize] = useState(16);
  const editorRef = useRef<{
    updateCode: (code: string) => void;
  }>(null);

  return (
    <div className="panel-layout">
      <EditorControls
        challengeId={challengeId}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onReset={() => editorRef.current?.updateCode(defaultCode)}
      />
      {isLoading || defaultCode === "" ? (
        <Spinner />
      ) : (
        <MonacoEditor fontSize={fontSize} challengeId={challengeId} defaultCode={defaultCode} sharedCode={sharedCode} ref={editorRef} />
      )}
      <Executor testCode={testCode} testCases={testCases} solution={solution} />
    </div>
  );
}

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { getCodeFromLocalStorage, saveCodeToLocalStorage } from "@/ui/utils/code-editor";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { Spinner } from "@radix-ui/themes";
import type * as Monaco from "monaco-editor";

interface Props {
  fontSize: number;
  challengeId: number;
  defaultCode: string;
  sharedCode?: string;
}

function MonacoEditorWithRef(
  { fontSize, challengeId, defaultCode, sharedCode }: Props,
  ref: React.Ref<{ updateCode: (code: string) => void }>,
) {
  const { resolvedTheme } = useTheme();
  const setUserCode = useChallengeStore((state) => state.setUserCode);
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const editorOptions = useMemo(
    () => ({
      fontSize,
      formatOnType: true,
      minimap: { enabled: false },
      scrollbar: { verticalScrollbarSize: 6 },
    }),
    [fontSize],
  );

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    const initial = sharedCode ?? getCodeFromLocalStorage(challengeId) ?? defaultCode;
    editor.setValue(initial);
    setUserCode(initial);
  };

  function onCodeChange(value?: string) {
    const code = value || "";
    if (!sharedCode) {
      saveCodeToLocalStorage(challengeId, code);
    }
    setUserCode(code);
  }

  useImperativeHandle(
    ref,
    () => ({
      updateCode: (code: string) => {
        editorRef.current?.setValue(code);
        setUserCode(code);
        saveCodeToLocalStorage(challengeId, code);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Editor
      height="calc(100% - 8.5rem)"
      language="javascript"
      theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
      options={editorOptions}
      onChange={onCodeChange}
      onMount={onMount}
      loading={<Spinner />}
    />
  );
}

export const MonacoEditor = forwardRef(MonacoEditorWithRef);

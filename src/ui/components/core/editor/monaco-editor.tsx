import { forwardRef, useEffect, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  useSandpack,
  useActiveCode,
  useLoadingOverlayState,
  // FileTabs,
} from "@codesandbox/sandpack-react/unstyled";
import { getCodeFromLocalStorage, saveCodeToLocalStorage } from "@/ui/utils/code-editor";
import { Spinner } from "@radix-ui/themes";
// import classes from "./editor.module.scss";

interface Props {
  fontSize: number;
  challengeId: number;
}

function MonacoEditorWithRef(
  { fontSize, challengeId }: Props,
  ref: React.Ref<{ updateCode: (code: string) => void }>,
) {
  const { resolvedTheme } = useTheme();
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const overlayState = useLoadingOverlayState();

  function onCodeChange(value?: string) {
    const code = value || "";
    updateCode(code);
    saveCodeToLocalStorage(challengeId, code);
  }

  function setLocalCode() {
    const localCode = getCodeFromLocalStorage(challengeId);
    if (localCode) {
      updateCode(localCode);
    }
  }

  useEffect(() => {
    if (overlayState === "HIDDEN") {
      setLocalCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayState]);

  useImperativeHandle(
    ref,
    () => ({
      updateCode,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      {/* <FileTabs closableTabs={true} className={classes.fileTabs} /> */}
      <Editor
        height="calc(100% - 8.5rem)"
        language="javascript"
        theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
        options={{
          fontSize,
          formatOnType: true,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
          },
        }}
        key={sandpack.activeFile}
        value={code}
        onChange={onCodeChange}
        loading={<Spinner />}
      />
    </>
  );
}

export const MonacoEditor = forwardRef(MonacoEditorWithRef);

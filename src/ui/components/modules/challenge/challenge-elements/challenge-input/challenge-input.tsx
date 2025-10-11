import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { testCode } from "@/ui/utils/test-code";
import classes from "./challenge-input.module.scss";
import { Button } from "@radix-ui/themes";
import { RotateCcw } from "lucide-react";

interface Props {
  defaultInput: string;
}

export function ChallengeInput({ defaultInput }: Props) {
  const { sandpack } = useSandpack();
  const [userInput, setUserInput] = useState<string>(defaultInput);

  function onReset() {
    setUserInput(defaultInput);
  }

  useEffect(() => {
    sandpack.updateFile("/add.test.ts", testCode(userInput));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  return (
    <div className="relative">
      <ContentEditable
        className={classes.testInput}
        html={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        tagName="div"
      />
      <Button
        onClick={onReset}
        size="1"
        variant="ghost"
        aria-label="Reset code"
        className="absolute right-4 top-5"
      >
        <RotateCcw size="20" />
      </Button>
    </div>
  );
}

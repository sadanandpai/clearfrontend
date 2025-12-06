import { useEffect, useState } from "react";

import { Button } from "@radix-ui/themes";
import ContentEditable from "react-contenteditable";
import { RotateCcw } from "lucide-react";
import classes from "./challenge-input.module.scss";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";

interface Props {
  defaultInput: string;
  testCode: (arg: string) => string;
}

export function ChallengeInput({ defaultInput, testCode }: Props) {
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

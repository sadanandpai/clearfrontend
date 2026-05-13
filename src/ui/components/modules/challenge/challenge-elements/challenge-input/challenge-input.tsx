import { useEffect, useState } from "react";

import { Button } from "@radix-ui/themes";
import ContentEditable from "react-contenteditable";
import { RotateCcw } from "lucide-react";
import classes from "./challenge-input.module.scss";
import { useChallengeStore } from "@/ui/store/challenge.store";

interface Props {
  defaultInput: string;
}

export function ChallengeInput({ defaultInput }: Props) {
  const setUserInput = useChallengeStore((state) => state.setUserInput);
  const [userInput, setLocalInput] = useState<string>(defaultInput);

  function onReset() {
    setLocalInput(defaultInput);
  }

  useEffect(() => {
    setUserInput(userInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  useEffect(() => {
    setUserInput(defaultInput);
    setLocalInput(defaultInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultInput]);

  return (
    <div className="relative">
      <ContentEditable
        className={classes.testInput}
        html={userInput}
        onChange={(e) => setLocalInput(e.target.value)}
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

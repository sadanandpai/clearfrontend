"use client";

import { OTPInput, type SlotProps } from "input-otp";
import classes from "./input-otp.module.scss";

const FakeCaret = (
  <div className={classes.fakeCaret}>
    <div className={classes.caret} />
  </div>
);

function Slot(props: SlotProps) {
  return (
    <div className={classes.slot} data-active={props.isActive}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && FakeCaret}
    </div>
  );
}

interface Props {
  maxLength: number;
  onChange: (otp: string) => void;
}

export function UserOTPInput({ maxLength, onChange }: Props) {
  return (
    <OTPInput
      maxLength={maxLength}
      onChange={onChange}
      pattern="[0-9]*"
      className="!w-full"
      render={({ slots }) => (
        <div className="flex gap-4">
          {slots.slice(0, 6).map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </div>
      )}
    />
  );
}

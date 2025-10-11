"use client";

import { TextField } from "@radix-ui/themes";

interface Props {
  value?: string;
  setValue?: (value: string) => void;
  field?: string;
  placeHolder?: string;
  disabled?: boolean;
}

export function FullNameField({ value = "", setValue, disabled }: Props) {
  return (
    <TextField.Root
      id="name"
      name="name"
      placeholder="Full Name"
      type="text"
      minLength={3}
      maxLength={50}
      required
      value={value}
      disabled={disabled}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
}

export function EmailField({ value = "", setValue }: Props) {
  return (
    <TextField.Root
      id="email"
      name="email"
      placeholder="Email"
      type="text"
      required
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
}

export function PasswordField({
  field = "password",
  placeHolder = "Password",
  disabled = false,
}: Props) {
  return (
    <TextField.Root
      id={field}
      name={field}
      placeholder={placeHolder}
      minLength={8}
      maxLength={20}
      type="password"
      disabled={disabled}
      required
    />
  );
}

export function PhoneField({ value = "", setValue }: Props) {
  return (
    <TextField.Root
      id="phone"
      name="phone"
      placeholder="Phone"
      type="tel"
      required
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
}

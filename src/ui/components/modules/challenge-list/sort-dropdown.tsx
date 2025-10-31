"use client";

import { Select } from "@radix-ui/themes";
import { SortOption } from "./challenge-list.types";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: Props) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger placeholder="Sort by..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Sort by</Select.Label>
          <Select.Item value="newest">Newest First</Select.Item>
          <Select.Item value="oldest">Oldest First</Select.Item>
          <Select.Item value="name-asc">Name (A-Z)</Select.Item>
          <Select.Item value="name-desc">Name (Z-A)</Select.Item>
          <Select.Item value="difficulty-asc">Difficulty (Easy → Hard)</Select.Item>
          <Select.Item value="difficulty-desc">Difficulty (Hard → Easy)</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

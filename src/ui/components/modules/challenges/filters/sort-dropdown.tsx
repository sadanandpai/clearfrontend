"use client";

import { Select } from "@radix-ui/themes";
import type { SortOption } from "@/common/types/challenge.types";

export const SORT_OPTION_LABELS: Record<SortOption, string> = {
  none: "Default order",
  newest: "Newest first",
  oldest: "Oldest first",
  "name-asc": "Name (A–Z)",
  "name-desc": "Name (Z–A)",
  "difficulty-asc": "Difficulty (easy → hard)",
  "difficulty-desc": "Difficulty (hard → easy)",
};

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: Props) => {
  return (
    <Select.Root
      size="2"
      value={value}
      onValueChange={(v) => onChange(v as SortOption)}
    >
      <Select.Trigger placeholder="Sort by..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Sort by</Select.Label>
          {(Object.entries(SORT_OPTION_LABELS) as [SortOption, string][]).map(
            ([optionValue, label]) => (
              <Select.Item key={optionValue} value={optionValue}>
                {label}
              </Select.Item>
            ),
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

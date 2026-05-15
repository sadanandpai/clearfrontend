"use client";

import { Badge, Flex } from "@radix-ui/themes";

interface Props {
  availableTags: { tag: string; count: number }[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

function TagBadge({
  tag,
  count,
  selected,
  onToggle,
}: {
  tag: string;
  count: number;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Badge
      size="2"
      variant={selected ? "solid" : "soft"}
      className="cursor-pointer shrink-0"
      onClick={onToggle}
    >
      {tag}
      <span className="ml-1 opacity-70">({count})</span>
    </Badge>
  );
}

export const TagFilter = ({ availableTags, selectedTags, onChange }: Props) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <Flex align="center" gap="2" wrap="wrap" justify="start" className="w-full">
      <span className="font-semibold shrink-0 md:inline">Tags:</span>
      {availableTags.map(({ tag, count }) => (
        <TagBadge
          key={tag}
          tag={tag}
          count={count}
          selected={selectedTags.includes(tag)}
          onToggle={() => toggleTag(tag)}
        />
      ))}
    </Flex>
  );
};

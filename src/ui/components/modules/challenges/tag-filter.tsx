"use client";

import { Badge, Flex } from "@radix-ui/themes";

interface Props {
  availableTags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
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
    <Flex gap="2" wrap="wrap" align="center">
      <span className="font-semibold mr-2">Tags:</span>
      {availableTags.map((tag) => (
        <Badge
          key={tag}
          size="2"
          variant={selectedTags.includes(tag) ? "solid" : "soft"}
          className="cursor-pointer"
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
};

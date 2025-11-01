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
    <Flex gap="2" wrap="nowrap" align="center">
      <span style={{ fontWeight: 600, marginRight: 8, whiteSpace: "nowrap" }}>Tags:</span>
      {availableTags.map((tag) => (
        <Badge
          key={tag}
          size="2"
          variant={selectedTags.includes(tag) ? "solid" : "soft"}
          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
};

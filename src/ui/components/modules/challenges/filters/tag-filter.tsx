"use client";

import { useState } from "react";

import { Badge, Button, Flex, ScrollArea } from "@radix-ui/themes";

import classes from "./tag-filter.module.scss";

interface Props {
  availableTags: string[];
  selectedTags: string[];
  tagCounts: Record<string, number>;
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

export const TagFilter = ({
  availableTags,
  selectedTags,
  tagCounts,
  onChange,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <Flex direction="column" gap="2">
      <Flex
        align="center"
        gap="2"
        wrap="nowrap"
        justify={expanded ? "between" : "start"}
        className="w-full"
      >
        <span className="font-semibold shrink-0">Tags:</span>
        {!expanded && (
          <div className={classes.singleLineTrack}>
            <div className={classes.badgeRowNoWrap}>
              {availableTags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  count={tagCounts[tag] ?? 0}
                  selected={selectedTags.includes(tag)}
                  onToggle={() => toggleTag(tag)}
                />
              ))}
            </div>
          </div>
        )}
        <Button
          type="button"
          size="1"
          variant="ghost"
          className="shrink-0"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Show fewer" : "Show all tags"}
        </Button>
      </Flex>
      {expanded && (
        <ScrollArea type="hover" className={classes.expandedPanel}>
          <Flex gap="2" wrap="wrap" align="center" pb="2">
            {availableTags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                count={tagCounts[tag] ?? 0}
                selected={selectedTags.includes(tag)}
                onToggle={() => toggleTag(tag)}
              />
            ))}
          </Flex>
        </ScrollArea>
      )}
    </Flex>
  );
};

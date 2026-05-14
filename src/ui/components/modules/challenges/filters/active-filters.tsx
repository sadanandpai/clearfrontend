"use client";

import { Badge, Button, Flex, Text } from "@radix-ui/themes";

import { ChallengeFilters } from "@/common/types/challenge.types";
import { SORT_OPTION_LABELS } from "./sort-dropdown";
import { X } from "lucide-react";

interface Props {
  filters: ChallengeFilters;
  onRemoveDifficulty: () => void;
  onRemoveTag: (tag: string) => void;
  onRemoveSort: () => void;
  onRemoveSearch: () => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({
  filters,
  onRemoveDifficulty,
  onRemoveTag,
  onRemoveSort,
  onRemoveSearch,
  onClearAll,
}: Props) => {
  const hasFilters =
    filters.difficulty !== "All" ||
    filters.tags.length > 0 ||
    filters.sortBy !== "none" ||
    filters.search.trim() !== "";

  if (!hasFilters) return null;

  return (
    <Flex gap="3" wrap="wrap" align="center" className="w-[90%] mx-auto mb-3 mt-8">
      <Text size="3" weight="bold" className="self-center">
        Active filters:
      </Text>

      {filters.difficulty !== "All" && (
        <Badge size="2" variant="solid" className="cursor-pointer" onClick={onRemoveDifficulty}>
          Difficulty: <span className="capitalize">{filters.difficulty}</span>
          <X size={14} className="ml-1" />
        </Badge>
      )}

      {filters.tags.map((tag) => (
        <Badge
          key={tag}
          size="2"
          variant="solid"
          className="cursor-pointer"
          onClick={() => onRemoveTag(tag)}
        >
          Tag: {tag}
          <X size={14} className="ml-1" />
        </Badge>
      ))}

      {filters.sortBy !== "none" && (
        <Badge size="2" variant="solid" className="cursor-pointer" onClick={onRemoveSort}>
          Sort: {SORT_OPTION_LABELS[filters.sortBy]}
          <X size={14} className="ml-1" />
        </Badge>
      )}

      {filters.search.trim() !== "" && (
        <Badge size="2" variant="solid" className="cursor-pointer" onClick={onRemoveSearch}>
          Search: &quot;{filters.search}&quot;
          <X size={14} className="ml-1" />
        </Badge>
      )}

      <Button type="button" size="2" variant="ghost" onClick={onClearAll}>
        Clear all
      </Button>
    </Flex>
  );
};

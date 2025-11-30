"use client";

import { Badge, Flex } from "@radix-ui/themes";

import { ChallengeFilters } from "@/common/types/challenge.types";
import { X } from "lucide-react";

interface Props {
  filters: ChallengeFilters;
  onRemoveDifficulty: () => void;
  onRemoveTag: (tag: string) => void;
  onRemoveSort: () => void;
  onRemoveSearch: () => void;
}

export const ActiveFilters = ({
  filters,
  onRemoveDifficulty,
  onRemoveTag,
  onRemoveSort,
  onRemoveSearch,
}: Props) => {
  const hasFilters =
    filters.difficulty !== "All" ||
    filters.tags.length > 0 ||
    filters.sortBy !== "none" ||
    filters.search.trim() !== "";

  if (!hasFilters) return null;

  return (
    <Flex gap="2" wrap="wrap" className="px-[5%] mb-3">
      <span className="text-sm font-semibold self-center">
        Active filters:
      </span>

      {filters.difficulty !== "All" && (
        <Badge size="2" variant="solid" className="cursor-pointer" onClick={onRemoveDifficulty}>
          Difficulty: {filters.difficulty}
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
          Sort: {filters.sortBy}
          <X size={14} className="ml-1" />
        </Badge>
      )}

      {filters.search.trim() !== "" && (
        <Badge size="2" variant="solid" className="cursor-pointer" onClick={onRemoveSearch}>
          Search: &quot;{filters.search}&quot;
          <X size={14} className="ml-1" />
        </Badge>
      )}
    </Flex>
  );
};

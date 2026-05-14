"use client";

import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react";

import { Box, Flex } from "@radix-ui/themes";
import type { Challenge } from "@/common/types/challenge.types";
import { DifficultyBadge } from "@/ui/components/core/difficulty-badge/difficulty-badge";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { ActiveFilters } from "../filters/active-filters";
import { DifficultyFilter } from "../filters/difficulty-filter";
import SearchBar from "../filters/search-bar";
import { SortDropdown } from "../filters/sort-dropdown";
import { TagFilter } from "../filters/tag-filter";
import { useChallengeFilters } from "../filters/use-challenge-filters";
import {
  filterAndSortChallenges,
  getAllUniqueTags,
  getDifficultyCounts,
  getTagCounts,
} from "./challenge-list.utils";
import classes from "./challenges-table.module.scss";
import { routes } from "@/common/routes";
import { CheckCircle2, Circle } from "lucide-react";

export function ChallengesTable({
  challenges,
  solvedChallengeIds,
}: {
  challenges: Challenge[];
  solvedChallengeIds: number[];
}) {
  const { filters, updateFilters, resetFilters } = useChallengeFilters();

  const filteredChallenges = useMemo(
    () => filterAndSortChallenges(challenges, filters),
    [challenges, filters],
  );

  const difficultyCounts = useMemo(() => getDifficultyCounts(challenges), [challenges]);
  const availableTags = useMemo(() => getAllUniqueTags(challenges), [challenges]);
  const tagCounts = useMemo(() => getTagCounts(challenges), [challenges]);

  const setSearchQuery: Dispatch<SetStateAction<string>> = useCallback(
    (value) => {
      const next = typeof value === "function" ? value(filters.search) : value;
      if (next === filters.search) {
        return;
      }
      updateFilters({ search: next });
    },
    [filters.search, updateFilters],
  );

  return (
    <div>
      <Box className={classes.toolbar}>
        <Flex
          justify="end"
          align="center"
          gap="3"
          wrap="wrap"
          className={`${classes.searchSortRow} mt-4 md:mt-8`}
        >
          <Box className={classes.searchFieldColumn}>
            <SearchBar searchQuery={filters.search} setSearchQuery={setSearchQuery} />
          </Box>
          <Box className="shrink-0">
            <SortDropdown value={filters.sortBy} onChange={(s) => updateFilters({ sortBy: s })} />
          </Box>
        </Flex>
        <Flex direction="column" gap="4" className="mt-4">
          <DifficultyFilter
            selected={filters.difficulty}
            onChange={(d) => updateFilters({ difficulty: d })}
            counts={difficultyCounts}
          />
          <TagFilter
            availableTags={availableTags}
            selectedTags={filters.tags}
            tagCounts={tagCounts}
            onChange={(t) => updateFilters({ tags: t })}
          />
        </Flex>
      </Box>
      <ActiveFilters
        filters={filters}
        onClearAll={resetFilters}
        onRemoveDifficulty={() => updateFilters({ difficulty: "All" })}
        onRemoveTag={(tag) =>
          updateFilters({ tags: filters.tags.filter((t) => t !== tag) })
        }
        onRemoveSort={() => updateFilters({ sortBy: "none" })}
        onRemoveSearch={() => updateFilters({ search: "" })}
      />
      <table className={classes.challengesTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallenges.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-3">
                No challenges found
              </td>
            </tr>
          ) : (
            filteredChallenges.map((challenge, index) => (
              <tr key={challenge.id}>
                <td>{index + 1}</td>
                <td>
                  {solvedChallengeIds.includes(challenge.id) ? (
                    <CheckCircle2 size={20} className="text-green-500 inline-block" />
                  ) : (
                    <Circle size={20} className="text-gray-600 opacity-30 inline-block" />
                  )}
                </td>
                <td>
                  <RadixNextLink href={`${routes.challenges}/${challenge.id}`}>
                    {challenge.name}
                  </RadixNextLink>
                </td>
                <td>
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </td>
                <td>{challenge.tags.join(", ")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

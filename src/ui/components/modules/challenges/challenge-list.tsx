"use client";

import { Button, Flex } from "@radix-ui/themes";
import { CheckCircle2, Circle } from "lucide-react";
import {
  filterAndSortChallenges,
  getAllUniqueTags,
  getDifficultyCounts,
} from "./challenge-list.utils";

import { ActiveFilters } from "./active-filters";
import { Challenge } from "@/common/types/challenge.types";
import { ChallengeStats } from "./challenges-stats/challenge-stats";
import { DifficultyBadge } from "@/ui/components/core/difficulty-badge/difficulty-badge";
import { DifficultyFilter } from "./difficulty-filter";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import SearchBar from "./search-bar";
import { SortDropdown } from "./sort-dropdown";
import { TagFilter } from "./tag-filter";
import classes from "./challenges-table/challenges-table.module.scss";
import { routes } from "@/common/routes";
import { useChallengeFilters } from "./use-challenge-filters";
import { useMemo } from "react";

export function ChallengeList({
  challenges,
  solvedChallengeIds,
}: {
  challenges: Challenge[];
  solvedChallengeIds: number[];
}) {
  const { filters, updateFilters, resetFilters } = useChallengeFilters();
  const availableTags = useMemo(() => getAllUniqueTags(challenges), [challenges]);

  const filteredChallenges = useMemo(() => {
    return filterAndSortChallenges(challenges, filters);
  }, [challenges, filters]);

  const difficultyCounts = useMemo(() => getDifficultyCounts(challenges), [challenges]);

  const hasActiveFilters =
    filters.difficulty !== "All" ||
    filters.tags.length > 0 ||
    filters.sortBy !== "none" ||
    filters.search.trim() !== "";

  return (
    <div>
      <ChallengeStats challenges={challenges} solvedChallengeIds={solvedChallengeIds} />

      <SearchBar
        searchQuery={filters.search}
        setSearchQuery={(search: string) => updateFilters({ search })}
      />

      {/* Filters Section */}
      <Flex
        direction="column"
        gap="4"
        className="mt-6 mb-6 px-[5%]"
      >
        <Flex justify="between" align="center" wrap="wrap" gap="3">
          <DifficultyFilter
            selected={filters.difficulty}
            onChange={(difficulty) => updateFilters({ difficulty })}
            counts={difficultyCounts}
          />
          <Flex gap="2" align="center">
            <SortDropdown value={filters.sortBy} onChange={(sortBy) => updateFilters({ sortBy })} />
            {hasActiveFilters && (
              <Button variant="soft" onClick={resetFilters}>
                Clear Filters
              </Button>
            )}
          </Flex>
        </Flex>

        <TagFilter
          availableTags={availableTags}
          selectedTags={filters.tags}
          onChange={(tags) => updateFilters({ tags })}
        />
      </Flex>

      {/* Results Count */}
      <div className="px-[5%] mb-3 text-gray-500">
        Showing {filteredChallenges.length} of {challenges.length} challenges
      </div>

      {/* Table */}
      <ActiveFilters
        filters={filters}
        onRemoveDifficulty={() => updateFilters({ difficulty: "All" })}
        onRemoveTag={(tag) => updateFilters({ tags: filters.tags.filter((t) => t !== tag) })}
        onRemoveSort={() => updateFilters({ sortBy: "none" })}
        onRemoveSearch={() => updateFilters({ search: "" })}
      />
      <table className={classes.challengesTable}>
        <thead>
          <tr>
            <th>#</th>
            <th className="w-20 text-center pl-4">Status</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallenges.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-10 px-5">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl">🔍</span>
                  <span className="text-lg font-semibold">No challenges found</span>
                  <span className="text-sm opacity-70">
                    Try adjusting your filters or search terms
                  </span>
                  {hasActiveFilters && (
                    <Button variant="soft" onClick={resetFilters} className="mt-2">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            filteredChallenges.map((challenge, index) => (
              <tr key={challenge.id}>
                <td>{index + 1}</td>
                <td className="text-center pl-4">
                  {solvedChallengeIds.includes(challenge.id) ? (
                    <CheckCircle2 size={20} color="green" />
                  ) : (
                    <Circle size={20} color="gray" className="opacity-30" />
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
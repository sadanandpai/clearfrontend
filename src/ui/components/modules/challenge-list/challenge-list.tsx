"use client";

import { routes } from "@/common/routes";
import classes from "./challenge-list.module.scss";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { useMemo } from "react";
import SearchBar from "./search-bar";
import { filterAndSortChallenges, getAllUniqueTags } from "./challenge-list.utils";
import { Challenges } from "./challenge-list.types";
import { useChallengeFilters } from "./use-challenge-filters";
import { DifficultyFilter } from "./difficulty-filter";
import { TagFilter } from "./tag-filter";
import { SortDropdown } from "./sort-dropdown";
import { Flex, Button } from "@radix-ui/themes";

export function ChallengeList({ challenges }: { challenges: Challenges[] }) {
  const { filters, updateFilters, resetFilters } = useChallengeFilters();

  const availableTags = useMemo(() => getAllUniqueTags(challenges), [challenges]);

  const filteredChallenges = useMemo(() => {
    return filterAndSortChallenges(challenges, filters);
  }, [challenges, filters]);

  const hasActiveFilters =
    filters.difficulty !== "All" ||
    filters.tags.length > 0 ||
    filters.sortBy !== "none" ||
    filters.search.trim() !== "";

  return (
    <div>
      {/* Search Bar */}
      <SearchBar
        searchQuery={filters.search}
        setSearchQuery={(search: string) => updateFilters({ search })}
      />

      {/* Filters Section */}
      <Flex direction="column" gap="4" style={{ marginTop: 24, marginBottom: 24, padding: "0 5%" }}>
        <Flex justify="between" align="center" wrap="wrap" gap="3">
          <DifficultyFilter
            selected={filters.difficulty}
            onChange={(difficulty) => updateFilters({ difficulty })}
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
      <div style={{ padding: "0 5%", marginBottom: 12, color: "gray" }}>
        Showing {filteredChallenges.length} of {challenges.length} challenges
      </div>

      {/* Table */}
      <table className={classes.challengesTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallenges.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "12px 0" }}>
                No challenges found
              </td>
            </tr>
          ) : (
            filteredChallenges.map((challenge, index) => (
              <tr key={challenge.id}>
                <td>{index + 1}</td>
                <td>
                  <RadixNextLink href={`${routes.challenges}/${challenge.id}`}>
                    {challenge.name}
                  </RadixNextLink>
                </td>
                <td>{challenge.difficulty}</td>
                <td>{challenge.tags.join(", ")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

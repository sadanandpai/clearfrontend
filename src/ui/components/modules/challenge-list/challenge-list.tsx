"use client";

import { routes } from "@/common/routes";
import classes from "./challenge-list.module.scss";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { useMemo } from "react";
import SearchBar from "./search-bar";
import { filterAndSortChallenges, getAllUniqueTags, getDfifficultyCounts } from "./challenge-list.utils";
import { Challenges } from "./challenge-list.types";
import { useChallengeFilters } from "./use-challenge-filters";
import { DifficultyFilter } from "./difficulty-filter";
import { TagFilter } from "./tag-filter";
import { SortDropdown } from "./sort-dropdown";
import { Flex, Button, Badge } from "@radix-ui/themes";
import { ActiveFilters } from "./active-filters";
import { ChallengeStats } from "./challenge-stats";
import { getUserSolvedChallenges } from "@/server/actions/user-challenge";
import {useEffect, useState} from "react";
import { CheckCircle2, Circle } from "lucide-react";

export function ChallengeList({ challenges }: { challenges: Challenges[] }) {
  const { filters, updateFilters, resetFilters } = useChallengeFilters();
  const [solvedChallengeIds, setSolvedChallengeIds] = useState<number[]>([]);

  const availableTags = useMemo(() => getAllUniqueTags(challenges), [challenges]);

  const filteredChallenges = useMemo(() => {
    return filterAndSortChallenges(challenges, filters);
  }, [challenges, filters]);

  const difficultyCounts = useMemo(() => getDfifficultyCounts(challenges), [challenges]);

  const hasActiveFilters =
    filters.difficulty !== "All" ||
    filters.tags.length > 0 ||
    filters.sortBy !== "none" ||
    filters.search.trim() !== "";

  useEffect(() => {
    getUserSolvedChallenges().then(setSolvedChallengeIds);
  }, []);
  
  return (
    <div>
      {/* Challenge stats Dashboard */}
      <ChallengeStats 
      challenges={challenges}
      solvedChallengeIds={solvedChallengeIds}
      />
      {/* Search Bar */}
      <SearchBar
        searchQuery={filters.search}
        setSearchQuery={(search: string) => updateFilters({ search })}
      />
      
      {/* Filters Section */}
      <Flex direction="column" gap="4" style={{ marginTop: "1.5rem", marginBottom: "1.5rem", padding: "0 5%" }}>
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
      <div style={{ padding: "0 5%", marginBottom: "0.75rem", color: "gray" }}>
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
            <th style={{ width: "5rem", textAlign: "center", paddingLeft: "1rem" }}>Status</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallenges.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "2.5rem 1.25rem" }}>
                <div style={{ display:"flex", flexDirection: "column", alignItems:"center", gap:"0.75rem"}}>
                  <span style={{ fontSize: "3rem" }}>🔍</span>
                    <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>No challenges found</span>
                    <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>
                      Try adjusting your filters or search terms
                    </span>
                    {
                      hasActiveFilters && (
                        <Button variant="soft" onClick={resetFilters} style={{ marginTop: "0.5rem" }}>
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
                <td style={{ textAlign: "center", paddingLeft: "1rem" }}>
                  {solvedChallengeIds.includes(challenge.id) ? (
                    <CheckCircle2 size={20} color="green" />
                  ) : (
                    <Circle size={20} color="gray" style={{ opacity: 0.3 }} />
                  )}
                </td>
                <td>
                  <RadixNextLink href={`${routes.challenges}/${challenge.id}`}>
                    {challenge.name}
                  </RadixNextLink>
                </td>
                <td>
                  <Badge
                    color={
                      challenge.difficulty === "Easy"
                      ? "green"
                      : challenge.difficulty === "Medium"
                      ? "yellow"
                      : "red"
                    }
                    variant="soft"
                    >
                  {challenge.difficulty}
                  </Badge>
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

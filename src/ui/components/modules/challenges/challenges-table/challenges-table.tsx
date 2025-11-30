"use client";

import { useMemo, useState } from "react";

import { Challenge } from "@/common/types/challenge.types";
import { DifficultyBadge } from "@/ui/components/core/difficulty-badge/difficulty-badge";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import SearchBar from "../search-bar";
import classes from "./challenges-table.module.scss";
import { filterChallenges } from "../challenge-list.utils";
import { routes } from "@/common/routes";

export function ChallengesTable({ challenges }: { challenges: Challenge[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = useMemo(() => {
    return filterChallenges(challenges, searchQuery);
  }, [challenges, searchQuery]);

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
              <td colSpan={4} className="text-center py-3">
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

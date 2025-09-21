"use client";

import { routes } from "@/common/routes";
import classes from "./challenge-list.module.scss";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { useMemo, useState } from "react";
import SearchBar from "./search-bar";
import { filterChallenges } from "./challenge-list.utils";
import { Challenges } from "./challenge-list.types";



export function ChallengeList({ challenges} : {challenges:Challenges[]}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return challenges;
    return filterChallenges(challenges,query);
   
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

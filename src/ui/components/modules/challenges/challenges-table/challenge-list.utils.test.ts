import { describe, expect, it } from "vitest";

import type { Challenge, ChallengeFilters } from "@/common/types/challenge.types";
import { Difficulty } from "@/common/types/challenge.types";
import {
  filterAndSortChallenges,
  getDifficultyCounts,
  getUniqueTags,
} from "./challenge-list.utils";

const fixtures: Challenge[] = [
  { id: 1, name: "Alpha Easy", difficulty: Difficulty.Easy, tags: ["Array", "Math"] },
  { id: 3, name: "Charlie Hard", difficulty: Difficulty.Hard, tags: ["String"] },
  { id: 2, name: "Bravo Medium", difficulty: Difficulty.Medium, tags: ["Array", "Loop"] },
];

const baseFilters: ChallengeFilters = {
  difficulty: "All",
  tags: [],
  sortBy: "none",
  search: "",
};

describe("filterAndSortChallenges", () => {
  it("returns all challenges when filters are empty", () => {
    expect(filterAndSortChallenges(fixtures, baseFilters)).toEqual(fixtures);
  });

  it("filters by difficulty", () => {
    const result = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      difficulty: Difficulty.Easy,
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(1);
  });

  it("filters by a single tag", () => {
    const result = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      tags: ["String"],
    });
    expect(result.map((c) => c.id)).toEqual([3]);
  });

  it("uses AND semantics for multiple tags", () => {
    const result = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      tags: ["Array", "Math"],
    });
    expect(result.map((c) => c.id)).toEqual([1]);
  });

  it("filters by search across name, difficulty, and tags", () => {
    const byName = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      search: "bravo",
    });
    expect(byName.map((c) => c.id)).toEqual([2]);

    const byTag = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      search: "loop",
    });
    expect(byTag.map((c) => c.id)).toEqual([2]);
  });

  it("sorts by name ascending", () => {
    const result = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      sortBy: "name-asc",
    });
    expect(result.map((c) => c.name)).toEqual(["Alpha Easy", "Bravo Medium", "Charlie Hard"]);
  });

  it("sorts by id newest", () => {
    const result = filterAndSortChallenges(fixtures, {
      ...baseFilters,
      sortBy: "newest",
    });
    expect(result.map((c) => c.id)).toEqual([3, 2, 1]);
  });

  it("combines search, difficulty, tags, and sort", () => {
    const result = filterAndSortChallenges(fixtures, {
      difficulty: Difficulty.Medium,
      tags: ["Array"],
      sortBy: "name-desc",
      search: "",
    });
    expect(result.map((c) => c.id)).toEqual([2]);
  });
});

describe("getDifficultyCounts", () => {
  it("counts totals per difficulty including All", () => {
    expect(getDifficultyCounts(fixtures)).toEqual({
      All: 3,
      [Difficulty.Easy]: 1,
      [Difficulty.Medium]: 1,
      [Difficulty.Hard]: 1,
    });
  });
});

describe("getUniqueTags", () => {
  it("returns sorted unique tags", () => {
    const tags = getUniqueTags(fixtures, 2);
    expect(tags).toMatchInlineSnapshot(`
      [
        {
          "count": 2,
          "tag": "Array",
        },
      ]
    `);
  });
});

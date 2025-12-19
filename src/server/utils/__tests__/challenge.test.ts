import { describe, expect, it } from "vitest";

import { isValidChallengeId } from "@/server/utils/challenge";

describe("isValidChallengeId", () => {
  it("should return true for valid challenge ids", () => {
    expect(isValidChallengeId(1)).toBe(true);
  });

  it("should return false for invalid challenge ids", () => {
    expect(isValidChallengeId(16)).toBe(false);
  });

  it("should return false for undefined challenge ids", () => {
    expect(isValidChallengeId(undefined as unknown as number)).toBe(false);
  });

  it("should return false for null challenge ids", () => {
    expect(isValidChallengeId(null as unknown as number)).toBe(false);
  });

  it("should return false for challenge ids that are not strings", () => {
    expect(isValidChallengeId(123)).toBe(false);
    expect(isValidChallengeId({} as unknown as number)).toBe(false);
    expect(isValidChallengeId([] as unknown as number)).toBe(false);
  });
});

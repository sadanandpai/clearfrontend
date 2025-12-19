import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 15,
  name: "Minimum Window Substring",
  statement:
    'Given two strings <strong>s</strong> and <strong>t</strong>, return the minimum window substring of <strong>s</strong> such that every character in <strong>t</strong> (including duplicates) is included in the window. If no such substring exists, return an empty string "".',
  description: "",
  difficulty: "hard",
  languages: ["javascript"],
  examples: [
    {
      input: '"ADOBECODEBANC", "ABC"',
      output: "BANC",
    },
    {
      input: '"a", "a"',
      output: "a",
    },
    {
      input: '"a", "aa"',
      output: "",
    },
  ],
  sampleInput: '"ADOBECODEBANC", "ABC"',
  code: `/**
* @param {string} s
* @param {string} t
* @return {string}
*/
export default function minWindow(s, t) {
  // write your code here and return

}
`,
  solution: `/**
* @param {string} s
* @param {string} t
* @return {string}
*/
export default function minWindow(s, t) {
  if (t.length === 0) return "";
  if (t.length > s.length) return "";

  const need = new Map();
  for (const ch of t) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
  }
  const required = need.size;

  const windowCounts = new Map();
  let have = 0;
  let resStart = 0;
  let resLen = Infinity;

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    windowCounts.set(c, (windowCounts.get(c) ?? 0) + 1);
    if (need.has(c) && windowCounts.get(c) === need.get(c)) {
      have += 1;
    }

    while (have === required) {
      if (right - left + 1 < resLen) {
        resStart = left;
        resLen = right - left + 1;
      }
      const leftChar = s[left];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
      if (need.has(leftChar) && windowCounts.get(leftChar) < need.get(leftChar)) {
        have -= 1;
      }
      left += 1;
    }
  }

  return resLen === Infinity ? "" : s.slice(resStart, resStart + resLen);
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('classic example', () => {
    expect(userSolution("ADOBECODEBANC", "ABC")).toEqual(systemSolution("ADOBECODEBANC", "ABC"));
  });

  test('single char match', () => {
    expect(userSolution("a", "a")).toEqual(systemSolution("a", "a"));
  });

  test('no possible window', () => {
    expect(userSolution("a", "aa")).toEqual(systemSolution("a", "aa"));
  });

  test('duplicates in t must be respected', () => {
    expect(userSolution("aaabbbccc", "abc")).toEqual(systemSolution("aaabbbccc", "abc"));
    expect(userSolution("aaabbbccc", "aabb")).toEqual(systemSolution("aaabbbccc", "aabb"));
  });
});`,
  testCode: defaultTestCode,
};

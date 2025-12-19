import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 14,
  name: "Find First Occurrence in a String",
  statement:
    "Given two strings <strong>haystack</strong> and <strong>needle</strong>, return the index of the first occurrence of <strong>needle</strong> in <strong>haystack</strong>, or -1 if <strong>needle</strong> is not part of <strong>haystack</strong>.",
  description: "",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: '"sadbutsad", "sad"',
      output: "0",
    },
    {
      input: '"leetcode", "leeto"',
      output: "-1",
    },
    {
      input: '"hello", "ll"',
      output: "2",
    },
  ],
  sampleInput: '"sadbutsad", "sad"',
  code: `/**
* @param {string} haystack
* @param {string} needle
* @return {number}
*/
export default function strStr(haystack, needle) {
  // write your code here and return

}
`,
  solution: `/**
* @param {string} haystack
* @param {string} needle
* @return {number}
*/
export default function strStr(haystack, needle) {
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }
  return -1;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('example 1', () => {
    expect(userSolution("sadbutsad", "sad")).toEqual(systemSolution("sadbutsad", "sad"));
  });

  test('example 2 (not found)', () => {
    expect(userSolution("leetcode", "leeto")).toEqual(systemSolution("leetcode", "leeto"));
  });

  test('middle occurrence', () => {
    expect(userSolution("hello", "ll")).toEqual(systemSolution("hello", "ll"));
  });

  test('needle longer than haystack', () => {
    expect(userSolution("ab", "abc")).toEqual(systemSolution("ab", "abc"));
  });

  test('empty needle returns 0', () => {
    expect(userSolution("abc", "")).toEqual(systemSolution("abc", ""));
  });
});`,
  testCode: defaultTestCode,
};

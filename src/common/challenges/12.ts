import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 12,
  name: "Top K Frequent Elements",
  statement:
    "Given an integer array <strong>nums</strong> and an integer <strong>k</strong>, return the <strong>k</strong> most frequent elements. The answer can be returned in any order.",
  description: "",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "[1,1,1,2,2,3], 2",
      output: "[1,2]",
    },
    {
      input: "[1], 1",
      output: "[1]",
    },
    {
      input: "[4,4,4,6,6,7], 1",
      output: "[4]",
    },
  ],
  sampleInput: "[1,1,1,2,2,3], 2",
  code: `/**
* @param {number[]} nums
* @param {number} k
* @return {number[]}
*/
export default function topKFrequent(nums, k) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number[]} nums
* @param {number} k
* @return {number[]}
*/
export default function topKFrequent(nums, k) {
  const frequencyMap = new Map();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
  }
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of frequencyMap.entries()) {
    buckets[count].push(num);
  }
  const result = [];
  for (let count = buckets.length - 1; count >= 0 && result.length < k; count--) {
    for (const num of buckets[count]) {
      result.push(num);
      if (result.length === k) break;
    }
  }
  return result;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

const sortAsc = (arr) => [...arr].sort((a, b) => a - b);

describe('inputTest', () => {
  test('example: [1,1,1,2,2,3], 2 -> [1,2]', () => {
    expect(sortAsc(userSolution([1,1,1,2,2,3], 2))).toEqual(sortAsc(systemSolution([1,1,1,2,2,3], 2)));
  });

  test('single element array', () => {
    expect(sortAsc(userSolution([1], 1))).toEqual(sortAsc(systemSolution([1], 1)));
  });

  test('choose most frequent among ties', () => {
    expect(sortAsc(userSolution([4,4,4,6,6,7], 1))).toEqual(sortAsc(systemSolution([4,4,4,6,6,7], 1)));
  });

  test('k equals unique count', () => {
    expect(sortAsc(userSolution([1,2,3,4], 4))).toEqual(sortAsc(systemSolution([1,2,3,4], 4)));
  });

  test('handles negative numbers', () => {
    expect(sortAsc(userSolution([-1,-1,-2,-2,-2,3], 2))).toEqual(sortAsc(systemSolution([-1,-1,-2,-2,-2,3], 2)));
  });
});`,
  testCode: defaultTestCode,
};

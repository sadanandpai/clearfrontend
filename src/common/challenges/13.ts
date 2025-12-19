import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 13,
  name: "Remove Duplicates from Sorted Array",
  statement:
    "Given a sorted array <strong>nums</strong>, remove the duplicates such that each element appears only once. Return the resulting array of unique elements.",
  description: "",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: "[1,1,2]",
      output: "[1,2]",
    },
    {
      input: "[0,0,1,1,1,2,2,3,3,4]",
      output: "[0,1,2,3,4]",
    },
    {
      input: "[]",
      output: "[]",
    },
  ],
  sampleInput: "[1,1,2]",
  code: `/**
* @param {number[]} nums
* @return {number[]}
*/
export default function removeDuplicates(nums) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number[]} nums
* @return {number[]}
*/
export default function removeDuplicates(nums) {
  if (nums.length === 0) return [];
  let write = 1;
  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[read - 1]) {
      nums[write] = nums[read];
      write += 1;
    }
  }
  return nums.slice(0, write);
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('basic case', () => {
    expect(userSolution([1,1,2])).toEqual(systemSolution([1,1,2]));
  });

  test('longer array with duplicates', () => {
    expect(userSolution([0,0,1,1,1,2,2,3,3,4]))
      .toEqual(systemSolution([0,0,1,1,1,2,2,3,3,4]));
  });

  test('empty array', () => {
    expect(userSolution([])).toEqual(systemSolution([]));
  });

  test('single element', () => {
    expect(userSolution([5])).toEqual(systemSolution([5]));
  });

  test('all identical elements', () => {
    expect(userSolution([2,2,2,2])).toEqual(systemSolution([2,2,2,2]));
  });
});`,
  testCode: defaultTestCode,
};

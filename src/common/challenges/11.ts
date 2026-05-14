import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 11,
  name: "Merge Two Sorted Lists",
  statement:
    "Given two sorted lists <strong>list1</strong> and <strong>list2</strong> (represented as arrays), merge them into one sorted list and return it.",
  description: "",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: "[1,2,4], [1,3,4]",
      output: "[1,1,2,3,4,4]",
    },
    {
      input: "[], []",
      output: "[]",
    },
    {
      input: "[], [0]",
      output: "[0]",
    },
  ],
  sampleInput: "[1,2,4], [1,3,4]",
  code: `/**
* @param {number[]} list1
* @param {number[]} list2
* @return {number[]}
*/
export default function mergeTwoLists(list1, list2) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number[]} list1
* @param {number[]} list2
* @return {number[]}
*/
export default function mergeTwoLists(list1, list2) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) {
      merged.push(list1[i]);
      i += 1;
    } else {
      merged.push(list2[j]);
      j += 1;
    }
  }
  while (i < list1.length) {
    merged.push(list1[i]);
    i += 1;
  }
  while (j < list2.length) {
    merged.push(list2[j]);
    j += 1;
  }
  return merged;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should merge two non-empty sorted lists', () => {
    expect(userSolution([1,2,4], [1,3,4])).toEqual(systemSolution([1,2,4], [1,3,4]));
  });

  test('should handle both lists empty', () => {
    expect(userSolution([], [])).toEqual(systemSolution([], []));
  });

  test('should handle one empty list', () => {
    expect(userSolution([], [0])).toEqual(systemSolution([], [0]));
  });

  test('should handle duplicates correctly', () => {
    expect(userSolution([1,1,2], [1,1,3])).toEqual(systemSolution([1,1,2], [1,1,3]));
  });

  test('should handle different lengths', () => {
    expect(userSolution([1,2,3,10], [2,5])).toEqual(systemSolution([1,2,3,10], [2,5]));
  });
});`,
  testCode: defaultTestCode,
};

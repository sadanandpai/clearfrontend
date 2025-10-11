export const problem = {
  id: 2,
  name: "Zip",
  statement:
    "Implement a function <strong>zip</strong>, that takes 2 arrays and returns a new array with elements of both arrays interleaved.",
  description: "",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "[1, 2], [3, 4]",
      output: "[1, 3, 2, 4]",
    },
    {
      input: "[1, 2], [4, 5, 6]",
      output: "[1, 4, 2, 5, 6]",
    },
    {
      input: "[1, 2, 3, 4], [5, 6]",
      output: "[1, 5, 2, 6, 3, 4]",
    },
  ],
  sampleInput: "[1, 2], [3, 4]",
  code: `/**
* @param {number[]} arr1
* @param {number[]} arr2
* @return {number[]}
*/
export default function zip(arr1, arr2) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number[]} arr1
* @param {number[]} arr2
* @return {number[]}
*/
export default function zip(arr1, arr2) {
  const result = [];
  const length = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < length; i++) {
    if (i < arr1.length) {
      result.push(arr1[i]);
    }
    if (i < arr2.length) {
      result.push(arr2[i]);
    }
  }
  return result;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should zip 2 arrays', () => {
    expect(userSolution([1, 2], [3, 4])).toEqual(systemSolution([1, 2], [3, 4]));
  });

  test('should zip smaller array with bigger array', () => {
    expect(userSolution([1, 2], [4, 5, 6])).toEqual(systemSolution([1, 2], [4, 5, 6]));
  });

  test('should zip larger array with smaller array', () => {
    expect(userSolution([1, 2, 3, 4], [5, 6])).toEqual(systemSolution([1, 2, 3, 4], [5, 6]));
  });

  test('should zip 2 empty arrays', () => {
    expect(userSolution([], [])).toEqual(systemSolution([], []));
  });

  test('should zip 1 empty array with another array', () => {
    expect(userSolution([], [1, 2, 3])).toEqual(systemSolution([], [1, 2, 3]));
  });

  test('should zip 1 array with another empty array', () => {
    expect(userSolution([1, 2, 3], [])).toEqual(systemSolution([1, 2, 3], []));
  });
});`,
};

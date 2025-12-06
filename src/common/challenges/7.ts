import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 7,
  name: "Array Chunking",
  statement:
    "Implement a function <strong>chunk</strong> that splits an array into chunks of the specified size.",
  description:
    "The function should take an array and a chunk size, and return a new array of chunks where each chunk has at most the specified size. The last chunk may contain fewer elements if the array length is not evenly divisible by the chunk size.",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "[1, 2, 3, 4, 5], 2",
      output: "[[1, 2], [3, 4], [5]]",
      explanation:
        "The array [1,2,3,4,5] is split into chunks of size 2, resulting in [[1,2], [3,4], [5]].",
    },
    {
      input: "[1, 2, 3, 4, 5, 6, 7, 8], 3",
      output: "[[1, 2, 3], [4, 5, 6], [7, 8]]",
      explanation:
        "The array is split into chunks of size 3, with the last chunk containing the remaining 2 elements.",
    },
    {
      input: "[], 2",
      output: "[]",
      explanation: "An empty array should return an empty array.",
    },
  ],
  sampleInput: "[1, 2, 3, 4, 5], 2",
  code: `/**
 * @param {Array} array - The array to be chunked
 * @param {number} size - The size of each chunk
 * @return {Array[]} - Array of chunked arrays
 */
export default function chunk(array, size) {
  // write your code here and return
  
}
`,
  solution: `/**
 * @param {Array} array - The array to be chunked
 * @param {number} size - The size of each chunk
 * @return {Array[]} - Array of chunked arrays
 */
export default function chunk(array, size) {
  if (!array.length || size <= 0) return [];
  
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('chunk function tests', () => {
  test('should split array into chunks of specified size', () => {
    expect(userSolution([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('should handle chunks larger than array length', () => {
    expect(userSolution([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test('should return empty array for empty input array', () => {
    expect(userSolution([], 2)).toEqual([]);
  });

  test('should handle chunk size of 1', () => {
    expect(userSolution([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  test('should handle chunk size of 0', () => {
    expect(userSolution([1, 2, 3], 0)).toEqual([]);
  });
});`,
  testCode: defaultTestCode,
};

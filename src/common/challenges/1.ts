// import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 1,
  name: "Two Sum",
  statement: "Implement a function <strong>sum</strong>, that sums the given 2 numbers.",
  description: "",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: "1, 2",
      output: "3",
    },
    {
      input: "7, -5",
      output: "2",
    },
    {
      input: "0, -10",
      output: "-10",
    },
  ],
  sampleInput: "1, 2",
  code: `/**
* @param {number} num1
* @param {number} num2
* @return {number}
*/
export default function sum(num1, num2) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number} num1
* @param {number} num2
* @return {number}
*/
export default function sum(num1, num2) {
  return num1 + num2;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should check if sum of 2 positive numbers is correct', () => {
    expect(userSolution(1, 2)).toEqual(systemSolution(1, 2));
  });

  test('should check if sum of 2 positive or negative numbers is correct', () => {
    expect(userSolution(4, -7)).toEqual(systemSolution(4, -7));
  });

  test('should check if sum of 2 decimal numbers is correct', () => {
    expect(userSolution(3.6, 4.3)).toEqual(systemSolution(3.6, 4.3));
  });

  test('should check if sum of 2 large numbers is correct', () => {
    expect(userSolution(100, 200)).toEqual(systemSolution(100, 200));
  });  
});`,
  // testCode: defaultTestCode,
};

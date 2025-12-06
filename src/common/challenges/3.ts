import { randomNumberTestCode } from "../test-codes/3";

//  Create a function that returns a random number in the given range of values, both inclusive
export const problem = {
  id: 3,
  name: "Random Number",
  statement:
    "Implement a function <strong>randomNumber</strong>, that returns a random number in the given range of values, both inclusive.",
  description: "",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: "1, 5",
      output: "4",
    },
    {
      input: "0, 10",
      output: "7",
    },
    {
      input: "-10, 10",
      output: "-10",
    },
  ],
  sampleInput: "3, 12",
  code: `/**
* @param {number} num1
* @param {number} num2
* @return {number}
*/
export default function randomNumber(num1, num2) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number} num1
* @param {number} num2
* @return {number}
*/
export default function randomNumber(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should check when range is positive', () => {
    const output = userSolution(1, 5);
    expect(output).toBeGreaterThanOrEqual(1);
    expect(output).toBeLessThanOrEqual(5);
  });

  test('should check when range is negative', () => {
    const output = userSolution(-10, -2);
    expect(output).toBeGreaterThanOrEqual(-10);
    expect(output).toBeLessThanOrEqual(-2);
  });

  test('should check when range starts from 0', () => {
    const output = userSolution(0, 10);
    expect(output).toBeGreaterThanOrEqual(0);
    expect(output).toBeLessThanOrEqual(10);
  });

  test('should check when range ends at 0', () => {
    const output = userSolution(-10, 0);
    expect(output).toBeGreaterThanOrEqual(-10);
    expect(output).toBeLessThanOrEqual(0);
  });

  test('should check when range starts from negative and ends at positive', () => {
    const output = userSolution(-10, 10);
    expect(output).toBeGreaterThanOrEqual(-10);
    expect(output).toBeLessThanOrEqual(10);
  });
});`,
  testCode: randomNumberTestCode,
};

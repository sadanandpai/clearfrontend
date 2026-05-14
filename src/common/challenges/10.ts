import { defaultTestCode } from "@/common/test-codes";

export const problem = {
  id: 10,
  name: "Reverse Bits (32-bit)",
  statement:
    "Given a 32-bit number <strong>n</strong>, reverse its bits and return the result as a 32-bit number.",
  description: "",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: "43261596",
      output: "964176192",
    },
    {
      input: "45",
      output: "2835349504",
    },
    {
      input: "0",
      output: "0",
    },
  ],
  sampleInput: "43261596",
  code: `/**
* @param {number} n
* @return {number}
*/
export default function reverseBits(n) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number} n
* @return {number}
*/
export default function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('example: 43261596 -> 964176192', () => {
    expect(userSolution(43261596)).toEqual(systemSolution(43261596));
  });

  test('example: 45 -> 2835349504', () => {
    expect(userSolution(45)).toEqual(systemSolution(45));
  });

  test('zero stays zero', () => {
    expect(userSolution(0)).toEqual(systemSolution(0));
  });

  test('all ones stays all ones reversed', () => {
    expect(userSolution(4294967295)).toEqual(systemSolution(4294967295));
  });
});`,
  testCode: defaultTestCode,
};

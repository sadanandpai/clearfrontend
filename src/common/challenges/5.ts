import { defaultTestCode } from "../test-codes";

// Create a function that checks if the input string has valid parentheses
export const problem = {
  id: 5,
  name: "Valid Parentheses",
  statement:
    "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
  description:
    "An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order. 3. Every close bracket has a corresponding open bracket of the same type.",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: '"()"',
      output: "true",
    },
    {
      input: '"()[]{}"',
      output: "true",
    },
    {
      input: '"(]"',
      output: "false",
    },
    {
      input: '"([)]"',
      output: "false",
    },
    {
      input: '"{[]}"',
      output: "true",
    },
  ],
  sampleInput: '"()[]{}"',
  code: `/**
 * @param {string} s
 * @return {boolean}
 */
export default function isValid(s) {
  // write your code here and return
  
}
`,
  solution: `/**
 * @param {string} s
 * @return {boolean}
 */
export default function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char in map) {
      const top = stack.pop();
      if (map[char] !== top) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('isValid', () => {
  test('should validate simple parentheses', () => {
    expect(userSolution('()')).toBe(true);
  });

  test('should validate multiple types of brackets', () => {
    expect(userSolution('()[]{}')).toBe(true);
  });

  test('should return false for invalid nesting', () => {
    expect(userSolution('(]')).toBe(false);
  });

  test('should handle nested brackets', () => {
    expect(userSolution('{[]}')).toBe(true);
  });

  test('should return false for single closing bracket', () => {
    expect(userSolution(']')).toBe(false);
  });

  test('should handle empty string', () => {
    expect(userSolution('')).toBe(true);
  });

  test('should handle complex valid pattern', () => {
    expect(userSolution('({[]}){[()]}')).toBe(true);
  });

  test('should handle complex invalid pattern', () => {
    expect(userSolution('({[}])')).toBe(false);
  });
});`,
  testCode: defaultTestCode,
};

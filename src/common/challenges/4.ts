import { defaultTestCode } from "../test-codes";

// Create a function that checks if a string is a palindrome
export const problem = {
  id: 4,
  name: "Palindrome Check",
  statement:
    "Implement a function <strong>isPalindrome</strong> that takes a string as input and returns true if the string is a palindrome, and false otherwise.",
  description:
    "A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: '"A man, a plan, a canal: Panama"',
      output: "true",
    },
    {
      input: '"race a car"',
      output: "false",
    },
    {
      input: '"racecar"',
      output: "true",
    },
    {
      input: '" "',
      output: "true",
    },
    {
      input: '"a"',
      output: "true",
    },
  ],
  sampleInput: '"A man, a plan, a canal: Panama"',
  code: `/**
 * @param {string} str
 * @return {boolean}
 */
export default function isPalindrome(str) {
  // write your code here and return
  
}
`,
  solution: `/**
 * @param {string} str
 * @return {boolean}
 */
export default function isPalindrome(str) {
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleanStr === cleanStr.split('').reverse().join('');
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('isPalindrome', () => {
  test('should return true for valid palindrome with special characters', () => {
    expect(userSolution('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('should return false for non-palindrome string', () => {
    expect(userSolution('race a car')).toBe(false);
  });

  test('should return true for empty string', () => {
    expect(userSolution('')).toBe(true);
  });

  test('should handle single character', () => {
    expect(userSolution('a')).toBe(true);
  });

  test('should handle string with spaces', () => {
    expect(userSolution(' ')).toBe(true);
  });

  test('should handle numeric palindromes', () => {
    expect(userSolution('12321')).toBe(true);
  });

  test('should handle mixed case strings', () => {
    expect(userSolution('Able was I ere I saw Elba')).toBe(true);
  });

  test('should return false for non-palindrome with same case', () => {
    expect(userSolution('hello')).toBe(false);
  });
});`,
  testCode: defaultTestCode,
};

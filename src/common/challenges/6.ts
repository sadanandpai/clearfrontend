import { limitFunctionTestCode } from "../test-codes/6";

// Create a function that takes a function and returns a new function that can only be called n times
export const problem = {
  id: 6,
  name: "Function Call Limiter",
  statement:
    "Create a function called 'limit' that takes a function 'fn' and a number 'n', and returns a new function that can be invoked at most 'n' times. The returned function should return the result of the original function if called 'n' or fewer times, and 'undefined' for any subsequent calls.",
  description: "",
  difficulty: "medium",
  languages: ["javascript", "typescript"],
  examples: [
    {
      input: "2",
      output: "fn called 2 times",
    },
    {
      input: "4",
      output: "fn called 4 times",
    },
    {
      input: "0",
      output: "fn called 0 times",
    },
  ],
  sampleInput: "2",
  code: `/**
 * @param {Function} fn
 * @param {number} n
 * @return {Function}
 */
export default function limit(fn, n) {
  // fn argument is internally passed and you need to only pass n
  // write your code here and return
  
}`,
  solution: `function limit(fn, n) {
  let count = 0;
  return function(...args) {
    if (count < n) {
      count++;
      return fn.apply(this, args);
    }
    return undefined;
  };
}`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('limit', () => {
  test('should return a function', () => {
    const limitedFn = userSolution(() => 'test', 2);
    expect(typeof limitedFn).toBe('function');
  });

  test('should call the function only n times', () => {
    const mockFn = jest.fn((a, b) => a + b);
    const limitedFn = userSolution(mockFn, 2);
    
    expect(limitedFn(1, 2)).toBe(3);
    expect(limitedFn(3, 4)).toBe(7);
    expect(limitedFn(5, 6)).toBeUndefined();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test('should return undefined when n is 0', () => {
    const mockFn = jest.fn(() => 'test');
    const limitedFn = userSolution(mockFn, 0);
    
    expect(limitedFn()).toBeUndefined();
    expect(limitedFn()).toBeUndefined();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('should maintain the correct this context', () => {
    const obj = {
      value: 0,
      increment() { return ++this.value; }
    };
    
    const limitedIncrement = userSolution(obj.increment.bind(obj), 2);
    
    expect(limitedIncrement()).toBe(1);
    expect(limitedIncrement()).toBe(2);
    expect(limitedIncrement()).toBeUndefined();
    expect(obj.value).toBe(2);
  });
});`,
  testCode: limitFunctionTestCode,
};

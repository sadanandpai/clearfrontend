export const problem = {
  id: 8,
  name: "Implement Basic Debounce()",
  statement:
    "Build a debounce utility function that postpones the execution of a given function until after a specified delay period has elapsed since the last invocation.",
  description:
    "Debouncing is a performance optimization technique commonly used in web applications to limit how often a function executes. Your task is to create a <strong>debounce</strong> function that wraps another function and ensures it only runs after a quiet period (no new calls) of a specified duration.<br/><br/>When multiple calls occur in rapid succession, only the final call should execute after the delay period. Previous pending executions should be cancelled.<br/><br/><strong>Visual representation:</strong><br/>Original function calls: ─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G<br/>After debouncing (3 time units): ─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G<br/><br/><strong>Note:</strong> The timing mechanism used in tests may differ from standard browser setTimeout/clearTimeout for precision, but the interface remains identical.",
  difficulty: "medium",
  languages: ["javascript", "typescript"],
  examples: [
    {
      input: "['A@0', 'B@2', 'C@3']",
      output: "['C@6']",
      explanation:
        "Calls A, B, and C happen within a 3-unit window. Only C executes 3 units after its call time (at time 6).",
    },
    {
      input: "['A@0', 'B@2', 'C@3', 'D@8']",
      output: "['C@6', 'D@11']",
      explanation:
        "C executes at time 6 (3 units after time 3). D is separated by enough time, so it executes at time 11 (3 units after time 8).",
    },
    {
      input: "['A@0']",
      output: "['A@3']",
      explanation:
        "Single call executes after the delay period of 3 units.",
    },
  ],
  sampleInput: "['A@0', 'B@2', 'C@3']",
  code: `/**
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @return {Function} - The debounced function
 */
export default function debounce(func, delay) {
  // write your code here and return the debounced function

}
`,
  solution: `/**
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @return {Function} - The debounced function
 */
export default function debounce(func, delay) {
  let timeoutId = null;

  return function(...args) {
    // Clear any existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}
`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

describe('debounce function tests', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should debounce function calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = userSolution(mockFn, 300);

    debouncedFn('call1');
    debouncedFn('call2');
    debouncedFn('call3');

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('call3');
  });

  test('should execute function after delay with no new calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = userSolution(mockFn, 500);

    debouncedFn('test');

    jest.advanceTimersByTime(499);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  test('should reset timer on subsequent calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = userSolution(mockFn, 200);

    debouncedFn('first');
    jest.advanceTimersByTime(100);

    debouncedFn('second');
    jest.advanceTimersByTime(100);

    debouncedFn('third');
    jest.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('third');
  });

  test('should preserve function arguments', () => {
    const mockFn = jest.fn();
    const debouncedFn = userSolution(mockFn, 100);

    debouncedFn(1, 2, 3);
    debouncedFn(4, 5, 6);

    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(4, 5, 6);
  });

  test('should handle multiple separated call sequences', () => {
    const mockFn = jest.fn();
    const debouncedFn = userSolution(mockFn, 150);

    debouncedFn('first');
    jest.advanceTimersByTime(150);
    expect(mockFn).toHaveBeenCalledTimes(1);

    debouncedFn('second');
    jest.advanceTimersByTime(150);
    expect(mockFn).toHaveBeenCalledTimes(2);

    expect(mockFn).toHaveBeenNthCalledWith(1, 'first');
    expect(mockFn).toHaveBeenNthCalledWith(2, 'second');
  });
});`,
  testCode: (arg: string) => {
    return `import userSolution from './code';

describe('debounce test with input', () => {
  jest.useFakeTimers();

  test('should debounce according to the test input', () => {
    const calls: string[] = [];
    const func = (arg: string) => {
      calls.push(\`\${arg}@\${jest.now()}\`);
    };

    const debouncedFunc = userSolution(func, 3);
    const input = ${arg};

    input.forEach((call: string) => {
      const [arg, time] = call.split('@');
      setTimeout(() => debouncedFunc(arg), Number(time));
    });

    jest.runAllTimers();

    expect(calls.length).toBeGreaterThan(0);
  });
});`;
  },
};

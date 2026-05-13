export const problem = {
  id: 19,
  name: "Implement Throttle",
  statement:
    "Implement a <strong>throttle(fn, limit)</strong> function that ensures <strong>fn</strong> is called at most once per <strong>limit</strong> milliseconds.",
  description:
    "Throttling limits how often a function can fire. Unlike debounce (which waits for a quiet period), throttle guarantees the function executes immediately on the first call, then ignores subsequent calls until the <strong>limit</strong> window has passed.<br/><br/><strong>Behaviour:</strong><ul><li>First call executes immediately</li><li>Subsequent calls within the <code>limit</code> window are ignored</li><li>After the window expires, the next call executes immediately again</li></ul>",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "fn, 1000",
      output: "fn called at 0ms, ignored at 500ms, called again at 1000ms",
    },
  ],
  sampleInput: "fn, 1000",
  code: `/**
 * @param {Function} fn
 * @param {number} limit - ms between allowed calls
 * @return {Function}
 */
export default function throttle(fn, limit) {
  // write your code here

}
`,
  solution: `/**
 * @param {Function} fn
 * @param {number} limit - ms between allowed calls
 * @return {Function}
 */
export default function throttle(fn, limit) {
  let waiting = false;
  return function(...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => { waiting = false; }, limit);
    }
  };
}
`,
  testCases: `import userSolution from './code';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('calls fn on first invocation', () => {
    const fn = jest.fn();
    const throttled = userSolution(fn, 1000);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('ignores calls within the limit window', () => {
    const fn = jest.fn();
    const throttled = userSolution(fn, 1000);
    throttled();
    jest.advanceTimersByTime(500);
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('allows call after the limit window expires', () => {
    const fn = jest.fn();
    const throttled = userSolution(fn, 1000);
    throttled();
    jest.advanceTimersByTime(1000);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('passes arguments correctly', () => {
    const fn = jest.fn();
    const throttled = userSolution(fn, 500);
    throttled('a', 1);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });

  test('handles multiple windows', () => {
    const fn = jest.fn();
    const throttled = userSolution(fn, 200);
    throttled();
    jest.advanceTimersByTime(200);
    throttled();
    jest.advanceTimersByTime(200);
    throttled();
    expect(fn).toHaveBeenCalledTimes(3);
  });
});`,
  testCode: () => `import userSolution from './code';

describe('throttle input test', () => {
  test('calls fn once within limit', () => {
    const fn = jest.fn();
    const throttled = userSolution(fn, 1000);
    throttled();
    jest.advanceTimersByTime(500);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});`,
};

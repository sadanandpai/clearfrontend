export const problem = {
  id: 21,
  name: "Cancelable Debounce",
  statement:
    "Implement a <strong>debounce(fn, delay)</strong> function that returns a debounced function with a <strong>.cancel()</strong> method to abort a pending invocation.",
  description:
    "A standard debounce postpones execution until after a quiet period. This variant adds a <strong>.cancel()</strong> method that uses <strong>clearTimeout</strong> to discard the pending call entirely — useful when a component unmounts or an operation is no longer needed.<br/><br/><strong>Behaviour:</strong><ul><li>Calling the debounced function resets the timer as usual</li><li>Calling <code>.cancel()</code> clears the pending timeout — fn will NOT be called even after the delay</li><li>After cancellation, new calls should work normally again</li></ul>",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "fn, 300",
      output: "fn called after 300ms if not cancelled",
    },
    {
      input: "fn, 300 then .cancel()",
      output: "fn never called",
    },
  ],
  sampleInput: "fn, 300",
  code: `/**
 * @param {Function} fn
 * @param {number} delay
 * @return {Function} debounced function with .cancel() method
 */
export default function debounce(fn, delay) {
  // write your code here

}
`,
  solution: `/**
 * @param {Function} fn
 * @param {number} delay
 * @return {Function} debounced function with .cancel() method
 */
export default function debounce(fn, delay) {
  let timerId = null;

  function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }

  debounced.cancel = function() {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}
`,
  testCases: `import userSolution from './code';

describe('cancelable debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('calls fn after delay', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, 300);
    debounced();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('cancel() prevents fn from being called', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, 300);
    debounced();
    debounced.cancel();
    jest.advanceTimersByTime(300);
    expect(fn).not.toHaveBeenCalled();
  });

  test('cancel() has no effect if nothing is pending', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, 300);
    debounced.cancel();
    jest.advanceTimersByTime(300);
    expect(fn).not.toHaveBeenCalled();
  });

  test('new calls work normally after cancel', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, 300);
    debounced('first');
    debounced.cancel();
    debounced('second');
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });

  test('rapid calls only fire once', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, 200);
    debounced();
    debounced();
    debounced();
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('debounced function has a cancel method', () => {
    const debounced = userSolution(() => {}, 100);
    expect(typeof debounced.cancel).toBe('function');
  });
});`,
  testCode: (arg: string) => `import userSolution from './code';

describe('cancelable debounce input test', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('calls fn after delay without cancel', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, ${arg});
    debounced();
    jest.advanceTimersByTime(${arg} - 1);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('cancel() stops fn from firing', () => {
    const fn = jest.fn();
    const debounced = userSolution(fn, ${arg});
    debounced();
    debounced.cancel();
    jest.advanceTimersByTime(${arg});
    expect(fn).not.toHaveBeenCalled();
  });
});`,
};

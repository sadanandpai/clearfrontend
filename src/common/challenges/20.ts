export const problem = {
  id: 20,
  name: "Auto-Stopping Interval",
  statement:
    "Implement a <strong>createTimer(callback, interval, count)</strong> function that calls <strong>callback</strong> every <strong>interval</strong> ms exactly <strong>count</strong> times, then stops automatically.",
  description:
    "This challenge combines <strong>setInterval</strong> and <strong>clearInterval</strong>. Your function should start an interval that invokes <code>callback</code> repeatedly, but stops itself after exactly <code>count</code> invocations — without needing the caller to manually clear it.<br/><br/>Return the interval ID so it can be cleared externally if needed.",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    {
      input: "callback, 100, 3",
      output: "callback called 3 times then stops",
    },
    {
      input: "callback, 500, 1",
      output: "callback called once then stops",
    },
  ],
  sampleInput: "callback, 100, 3",
  code: `/**
 * @param {Function} callback
 * @param {number} interval - ms between calls
 * @param {number} count - how many times to call callback
 * @return {number} interval ID
 */
export default function createTimer(callback, interval, count) {
  // write your code here

}
`,
  solution: `/**
 * @param {Function} callback
 * @param {number} interval - ms between calls
 * @param {number} count - how many times to call callback
 * @return {number} interval ID
 */
export default function createTimer(callback, interval, count) {
  let calls = 0;
  const id = setInterval(() => {
    callback();
    calls++;
    if (calls >= count) clearInterval(id);
  }, interval);
  return id;
}
`,
  testCases: `import userSolution from './code';

describe('createTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('calls callback the correct number of times', () => {
    const cb = jest.fn();
    userSolution(cb, 100, 3);
    jest.advanceTimersByTime(300);
    expect(cb).toHaveBeenCalledTimes(3);
  });

  test('does not call callback before first interval', () => {
    const cb = jest.fn();
    userSolution(cb, 100, 3);
    jest.advanceTimersByTime(99);
    expect(cb).toHaveBeenCalledTimes(0);
  });

  test('stops after count reached', () => {
    const cb = jest.fn();
    userSolution(cb, 100, 2);
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(2);
  });

  test('works with count of 1', () => {
    const cb = jest.fn();
    userSolution(cb, 500, 1);
    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('returns an interval handle (browser: number; Node: object)', () => {
    const id = userSolution(() => {}, 100, 3);
    expect(['number', 'object']).toContain(typeof id);
  });
});`,
  testCode: (arg: string) => `import userSolution from './code';

describe('createTimer input test', () => {
  test('calls callback correct number of times', () => {
    const cb = jest.fn();
    const [, interval, count] = [null, ${arg}];
    userSolution(cb, interval, count);
    jest.advanceTimersByTime(interval * count);
    expect(cb).toHaveBeenCalledTimes(count);
  });
});`,
};

export const problem = {
  id: 16,
  name: "Promise Delay",
  statement:
    "Implement a <strong>delay(ms)</strong> function that returns a Promise which resolves after <strong>ms</strong> milliseconds.",
  description:
    "A delay utility is a fundamental building block in async JavaScript. It pauses execution for a given amount of time and is commonly used for polling, animations, rate-limiting, and test utilities.<br/><br/>Your function should accept a number of milliseconds and return a Promise that resolves (with no value) after that duration using <strong>setTimeout</strong>.",
  difficulty: "easy",
  languages: ["javascript"],
  examples: [
    { input: "1000", output: "resolves after 1000ms" },
    { input: "0", output: "resolves immediately" },
  ],
  sampleInput: "1000",
  code: `/**
 * @param {number} ms - milliseconds to wait
 * @return {Promise<void>}
 */
export default function delay(ms) {
  // write your code here

}
`,
  solution: `/**
 * @param {number} ms - milliseconds to wait
 * @return {Promise<void>}
 */
export default function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
`,
  testCases: `import userSolution from './code';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('returns a Promise', () => {
    const result = userSolution(1000);
    expect(result instanceof Promise).toBe(true);
  });

  test('resolves after the given delay', async () => {
    let resolved = false;
    const p = userSolution(500).then(() => { resolved = true; });
    expect(resolved).toBe(false);
    jest.advanceTimersByTime(499);
    expect(resolved).toBe(false);
    jest.advanceTimersByTime(1);
    await p;
    expect(resolved).toBe(true);
  });

  test('resolves immediately when ms is 0', async () => {
    let resolved = false;
    const p = userSolution(0).then(() => { resolved = true; });
    jest.advanceTimersByTime(0);
    await p;
    expect(resolved).toBe(true);
  });

  test('does not resolve before the delay', async () => {
    let resolved = false;
    userSolution(1000).then(() => { resolved = true; });
    jest.advanceTimersByTime(999);
    expect(resolved).toBe(false);
  });
});`,
  testCode: (arg: string) => `import userSolution from './code';

describe('delay input test', () => {
  test('does not resolve before the delay', () => {
    let resolved = false;
    userSolution(${arg}).then(() => { resolved = true; });
    if (${arg} > 0) {
      jest.advanceTimersByTime(${arg} - 1);
      expect(resolved).toBe(false);
    }
  });

  test('resolves exactly at the delay', async () => {
    let resolved = false;
    const p = userSolution(${arg}).then(() => { resolved = true; });
    jest.advanceTimersByTime(${arg});
    await p;
    expect(resolved).toBe(true);
  });
});`,
};

export const problem = {
  id: 17,
  name: "Implement Promise.all",
  statement:
    "Implement your own <strong>promiseAll(promises)</strong> function that behaves like the native <strong>Promise.all</strong>.",
  description:
    "Promise.all takes an array of promises and returns a single Promise that resolves when <strong>all</strong> input promises resolve, or rejects immediately when <strong>any</strong> input promise rejects.<br/><br/>The resolved value is an array of resolved values in the same order as the input, regardless of which promise resolved first.<br/><br/><strong>Edge cases to handle:</strong><ul><li>Empty array should resolve immediately with <code>[]</code></li><li>Non-promise values should be treated as already resolved</li><li>First rejection should immediately reject the result</li></ul>",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    { input: "[1, 2, 3]", output: "[1, 2, 3]" },
    { input: "[]", output: "[]" },
  ],
  sampleInput: "[Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]",
  code: `/**
 * @param {Array<Promise|any>} promises
 * @return {Promise<Array>}
 */
export default function promiseAll(promises) {
  // write your code here

}
`,
  solution: `/**
 * @param {Array<Promise|any>} promises
 * @return {Promise<Array>}
 */
export default function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) { resolve([]); return; }
    const results = new Array(promises.length);
    let remaining = promises.length;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        if (--remaining === 0) resolve(results);
      }).catch(reject);
    });
  });
}
`,
  testCases: `import userSolution from './code';

describe('promiseAll', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('resolves with array of values in order', async () => {
    const result = await userSolution([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('resolves empty array immediately', async () => {
    const result = await userSolution([]);
    expect(result).toEqual([]);
  });

  test('handles non-promise values', async () => {
    const result = await userSolution([1, Promise.resolve(2), 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('rejects on first rejection', async () => {
    let caught = null;
    await userSolution([
      Promise.resolve(1),
      Promise.reject(new Error('boom')),
      Promise.resolve(3),
    ]).catch(e => { caught = e.message; });
    expect(caught).toBe('boom');
  });

  test('preserves order regardless of resolution timing', async () => {
    const p1 = new Promise(r => setTimeout(() => r('slow'), 100));
    const p2 = new Promise(r => setTimeout(() => r('fast'), 10));
    jest.runAllTimers();
    const result = await userSolution([p1, p2]);
    expect(result).toEqual(['slow', 'fast']);
  });
});`,
  testCode: () => `import userSolution from './code';

describe('promiseAll input test', () => {
  test('resolves all promises', async () => {
    const result = await userSolution([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});`,
};

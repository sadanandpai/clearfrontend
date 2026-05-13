export const problem = {
  id: 18,
  name: "Async Retry",
  statement:
    "Implement a <strong>retry(fn, times)</strong> function that calls an async function and retries it up to <strong>times</strong> attempts if it throws.",
  description:
    "Retry logic is essential when working with unreliable async operations like network requests. Your <strong>retry</strong> function should:<br/><ul><li>Call <code>fn()</code> and return its result if it resolves</li><li>If it rejects, retry up to <code>times</code> total attempts</li><li>If all attempts fail, throw the last error</li></ul><br/>For example, <code>retry(fn, 3)</code> will try fn up to 3 times total before giving up.",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    { input: "fn, 3", output: "result on success" },
    { input: "alwaysFails, 2", output: "throws after 2 attempts" },
  ],
  sampleInput: "() => Promise.resolve(42), 3",
  code: `/**
 * @param {() => Promise<any>} fn - async function to retry
 * @param {number} times - max total attempts
 * @return {Promise<any>}
 */
export default async function retry(fn, times) {
  // write your code here

}
`,
  solution: `/**
 * @param {() => Promise<any>} fn - async function to retry
 * @param {number} times - max total attempts
 * @return {Promise<any>}
 */
export default async function retry(fn, times) {
  let lastError;
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}
`,
  testCases: `import userSolution from './code';

describe('retry', () => {
  test('returns result when fn succeeds on first try', async () => {
    const fn = () => Promise.resolve(42);
    const result = await userSolution(fn, 3);
    expect(result).toBe(42);
  });

  test('retries on failure and succeeds', async () => {
    let calls = 0;
    const fn = () => {
      calls++;
      if (calls < 3) return Promise.reject(new Error('not yet'));
      return Promise.resolve('success');
    };
    const result = await userSolution(fn, 3);
    expect(result).toBe('success');
    expect(calls).toBe(3);
  });

  test('throws after all attempts fail', async () => {
    let calls = 0;
    const fn = () => { calls++; return Promise.reject(new Error('always fails')); };
    let caught = null;
    await userSolution(fn, 3).catch(e => { caught = e.message; });
    expect(caught).toBe('always fails');
    expect(calls).toBe(3);
  });

  test('does not retry on success', async () => {
    let calls = 0;
    const fn = () => { calls++; return Promise.resolve('ok'); };
    await userSolution(fn, 5);
    expect(calls).toBe(1);
  });

  test('throws last error not first', async () => {
    let calls = 0;
    const fn = () => { calls++; return Promise.reject(new Error('error ' + calls)); };
    let caught = null;
    await userSolution(fn, 3).catch(e => { caught = e.message; });
    expect(caught).toBe('error 3');
  });
});`,
  testCode: (arg: string) => `import userSolution from './code';

describe('retry input test', () => {
  test('resolves with correct value', async () => {
    const result = await userSolution(${arg});
    expect(result).toBe(42);
  });
});`,
};

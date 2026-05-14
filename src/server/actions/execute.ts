"use server";

import * as esbuild from "esbuild";
import ivm from "isolated-vm";
import type { TestOutputProps } from "@/common/types/test";

function virtualPlugin(files: Record<string, string>): esbuild.Plugin {
  return {
    name: "virtual",
    setup(build) {
      build.onResolve({ filter: /^\.\// }, (args) => {
        const key = args.path.replace("./", "");
        if (key in files) return { path: args.path, namespace: "virtual" };
      });
      build.onLoad({ filter: /.*/, namespace: "virtual" }, (args) => {
        const key = args.path.replace("./", "");
        return { contents: files[key], loader: "ts" };
      });
    },
  };
}

const TEST_RUNNER_PREAMBLE = `
  const __results = [];
  const __consoleLogs = [];
  const __testQueue = [];
  const __beforeEachHooks = [];
  const __afterEachHooks = [];

  const console = {
    log: (...args) => __consoleLogs.push(args.map(String).join(' ')),
    error: (...args) => __consoleLogs.push('[error] ' + args.map(String).join(' ')),
    warn: (...args) => __consoleLogs.push('[warn] ' + args.map(String).join(' ')),
  };

  // Fake timers
  let __currentTime = 0;
  let __timerId = 0;
  const __pendingTimers = [];
  function setTimeout(fn, delay, ...args) {
    const id = ++__timerId;
    __pendingTimers.push({ id, fn, args, delay: delay || 0, fireAt: __currentTime + (delay || 0), type: 'timeout', cleared: false });
    return id;
  }
  function clearTimeout(id) {
    const t = __pendingTimers.find(t => t.id === id);
    if (t) t.cleared = true;
  }
  function setInterval(fn, delay, ...args) {
    const id = ++__timerId;
    __pendingTimers.push({ id, fn, args, delay: delay || 0, fireAt: __currentTime + (delay || 0), type: 'interval', cleared: false });
    return id;
  }
  function clearInterval(id) {
    const t = __pendingTimers.find(t => t.id === id);
    if (t) t.cleared = true;
  }
  function __advanceTime(ms) {
    const target = __currentTime + ms;
    let safety = 0;
    while (safety++ < 10000) {
      const active = __pendingTimers.filter(t => !t.cleared && t.fireAt <= target);
      if (!active.length) break;
      active.sort((a, b) => a.fireAt - b.fireAt);
      const timer = active[0];
      __currentTime = timer.fireAt;
      if (timer.type === 'timeout') {
        timer.cleared = true;
        timer.fn(...timer.args);
      } else {
        timer.fireAt += timer.delay;
        timer.fn(...timer.args);
      }
    }
    __currentTime = target;
  }

  // Jest compat
  const jest = {
    useFakeTimers: () => {},
    clearAllTimers: () => { __pendingTimers.forEach(t => { t.cleared = true; }); },
    runAllTimers: () => __advanceTime(86400000),
    advanceTimersByTime: (ms) => __advanceTime(ms),
    now: () => __currentTime,
    fn: (impl) => {
      let _impl = impl;
      const calls = [];
      const mock = function(...args) { calls.push(args); return _impl ? _impl(...args) : undefined; };
      mock.mock = { calls };
      mock.mockReturnValue = (val) => { _impl = () => val; return mock; };
      mock.mockImplementation = (fn) => { _impl = fn; return mock; };
      return mock;
    },
  };

  function beforeEach(fn) { __beforeEachHooks.push(fn); }
  function afterEach(fn) { __afterEachHooks.push(fn); }
  function describe(name, fn) { fn(); }
  function test(name, fn) { __testQueue.push({ name, fn }); }
  const it = test;

  function expect(received) {
    const pass = (ok, msg) => { if (!ok) throw new Error(msg); };
    const m = {
      toBe: (e) => pass(received === e, 'Expected ' + JSON.stringify(e) + ' but got ' + JSON.stringify(received)),
      toEqual: (e) => pass(JSON.stringify(received) === JSON.stringify(e), 'Expected ' + JSON.stringify(e) + ' but got ' + JSON.stringify(received)),
      toStrictEqual: (e) => pass(JSON.stringify(received) === JSON.stringify(e), 'Expected ' + JSON.stringify(e) + ' but got ' + JSON.stringify(received)),
      toBeGreaterThan: (n) => pass(received > n, 'Expected ' + received + ' > ' + n),
      toBeGreaterThanOrEqual: (n) => pass(received >= n, 'Expected ' + received + ' >= ' + n),
      toBeLessThan: (n) => pass(received < n, 'Expected ' + received + ' < ' + n),
      toBeLessThanOrEqual: (n) => pass(received <= n, 'Expected ' + received + ' <= ' + n),
      toBeTruthy: () => pass(!!received, 'Expected truthy but got ' + received),
      toBeFalsy: () => pass(!received, 'Expected falsy but got ' + received),
      toBeNull: () => pass(received === null, 'Expected null but got ' + received),
      toBeUndefined: () => pass(received === undefined, 'Expected undefined but got ' + received),
      toContain: (item) => {
        if (Array.isArray(received)) pass(received.includes(item), 'Expected array to contain ' + JSON.stringify(item));
        else pass(String(received).includes(item), 'Expected string to contain ' + JSON.stringify(item));
      },
      toHaveLength: (n) => pass(received.length === n, 'Expected length ' + n + ' but got ' + received.length),
      toThrow: (msg) => {
        if (typeof received !== 'function') throw new Error('toThrow requires a function');
        try { received(); throw new Error('__no_throw__'); }
        catch(e) {
          if (e.message === '__no_throw__') throw new Error('Expected function to throw');
          if (msg && !e.message.includes(msg)) throw new Error('Expected error "' + msg + '" but got "' + e.message + '"');
        }
      },
      toHaveBeenCalled: () => { if (!received?.mock) throw new Error('Not a mock'); pass(received.mock.calls.length > 0, 'Expected mock to have been called'); },
      toHaveBeenCalledTimes: (n) => { if (!received?.mock) throw new Error('Not a mock'); pass(received.mock.calls.length === n, 'Expected ' + n + ' calls but got ' + received.mock.calls.length); },
      toHaveBeenCalledWith: (...args) => { if (!received?.mock) throw new Error('Not a mock'); pass(received.mock.calls.some(c => JSON.stringify(c) === JSON.stringify(args)), 'Not called with ' + JSON.stringify(args) + ', calls: ' + JSON.stringify(received.mock.calls)); },
      toHaveBeenNthCalledWith: (n, ...args) => { if (!received?.mock) throw new Error('Not a mock'); const c = received.mock.calls[n-1]; pass(c && JSON.stringify(c) === JSON.stringify(args), 'Expected ' + n + 'th call with ' + JSON.stringify(args) + ' but got ' + JSON.stringify(c)); },
    };
    m.not = Object.fromEntries(Object.entries(m).map(([k, fn]) => [k, (...args) => {
      let threw = false; try { fn(...args); } catch { threw = true; }
      if (!threw) throw new Error('Expected NOT ' + k);
    }]));
    return m;
  }
`;

const POST_BUNDLE_RUNNER = `
  __testQueue.reduce((chain, { name, fn }) =>
    chain
      .then(() => Promise.all(__beforeEachHooks.map(h => h())))
      .then(() => fn())
      .then(() => __results.push({ name, status: 'pass', error: '' }))
      .catch((e) => __results.push({ name, status: 'fail', error: e.message || String(e) }))
      .then(() => Promise.all(__afterEachHooks.map(h => h())))
  , Promise.resolve()).then(() => null);
`;

export async function executeTests(
  userCode: string,
  testCode: string,
  solutionCode: string,
): Promise<{ outputs: TestOutputProps[]; status: boolean; consoleLogs: string[] }> {
  const buildResult = await esbuild.build({
    stdin: { contents: testCode, loader: "ts" },
    bundle: true,
    format: "cjs",
    platform: "node",
    write: false,
    logLevel: "silent",
    plugins: [virtualPlugin({ code: userCode, solution: solutionCode })],
  });

  const bundle = buildResult.outputFiles[0].text;

  const isolate = new ivm.Isolate({ memoryLimit: 64 });
  const context = await isolate.createContext();

  try {
    await context.eval(TEST_RUNNER_PREAMBLE + "\n" + bundle, { timeout: 5000 });
    await context.eval(POST_BUNDLE_RUNNER, { timeout: 5000, promise: true });

    const outputsJson = (await context.eval("JSON.stringify(__results)")) as string;
    const logsJson = (await context.eval("JSON.stringify(__consoleLogs)")) as string;

    const outputs: TestOutputProps[] = JSON.parse(outputsJson);
    return {
      outputs,
      status: outputs.every((o) => o.status === "pass"),
      consoleLogs: JSON.parse(logsJson),
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return {
      outputs: [{ name: "Execution Error", status: "fail", error: message }],
      status: false,
      consoleLogs: [],
    };
  } finally {
    isolate.dispose();
  }
}

# Security Model — Code Execution

ClearFrontend executes **untrusted user JavaScript** on the server. This document describes the threat model and layered defenses.

---

## Threat Model

Untrusted code submitted by a user could attempt to:

- Read environment variables (`process.env.APPWRITE_KEY`)
- Access the filesystem (`fs.readFileSync`)
- Make outbound network requests
- Exhaust CPU or memory (DoS)
- Pollute `Object.prototype` affecting other requests
- Escape the sandbox and access Node internals

---

## Why Not the `vm` Module

Node's built-in `vm` module shares the same V8 context as the host. A classic escape:

```js
({}).constructor.constructor('return process')()
// → returns the real Node.js `process` object
```

This gives full access to env vars, the filesystem, and the ability to `require` any module. The `vm` module is **not used** in this project.

---

## isolated-vm Isolation

`isolated-vm` creates a true separate V8 `Isolate` — a completely independent heap with no shared memory.

```ts
const isolate = new ivm.Isolate({ memoryLimit: 64 }); // 64 MB hard cap
const context = await isolate.createContext();
await context.eval(code, { timeout: 5000 }); // 5s wall-clock limit
```

Inside the isolate there is **no access** to:
- `process` or `process.env`
- `require` or `import()`
- `__dirname`, `__filename`
- `Buffer`, `fetch`, `XMLHttpRequest`
- Any Node.js built-in module

---

## esbuild Bundling

User code and test code are bundled in memory before entering the isolate:

```ts
esbuild.build({
  stdin: { contents: testCode, loader: "ts" },
  bundle: true,
  format: "cjs",       // CommonJS — no dynamic require resolution at runtime
  platform: "node",
  write: false,        // no disk I/O
  plugins: [virtualPlugin({ code: userCode, solution: solutionCode })],
})
```

The virtual plugin intercepts `./code` and `./solution` imports and resolves them from in-memory strings. No real filesystem access occurs during bundling.

---

## Fake Timer Security

Real `setTimeout`/`setInterval` are replaced entirely by stubs in `TEST_RUNNER_PREAMBLE`:

```js
let __currentTime = 0;
const __pendingTimers = [];
function setTimeout(fn, delay, ...args) { /* push to __pendingTimers */ }
function setInterval(fn, delay, ...args) { /* push to __pendingTimers */ }
```

`__advanceTime(ms)` processes pending timers in order. A safety limit of **10,000 iterations** prevents infinite timer loops from hanging the isolate. `jest.runAllTimers()` caps at 86,400,000 ms (24 hours).

No real OS timers ever fire inside the isolate.

---

## Console Capture

`console` is shadowed in the preamble:

```js
const console = {
  log: (...args) => __consoleLogs.push(args.map(String).join(' ')),
  error: (...args) => __consoleLogs.push('[error] ' + ...),
  warn: (...args) => __consoleLogs.push('[warn] ' + ...),
};
```

Output is stored in the `__consoleLogs` array inside the isolate. No data reaches Node's `process.stdout`.

---

## Result Transfer

Results cross the isolate boundary as JSON strings — a safe primitive transfer:

```ts
const outputsJson = await context.eval("JSON.stringify(__results)") as string;
// JSON.parse on the host — no object reference crosses the boundary
const outputs = JSON.parse(outputsJson);
```

`POST_BUNDLE_RUNNER` ends with `.then(() => null)` to ensure the `{ promise: true }` eval resolves with a primitive. Returning an array or object directly across the boundary would throw `"A non-transferable value was passed"`.

---

## Vercel Serverless Isolation

Each Vercel serverless invocation is a fresh ephemeral process. Even if user code somehow escaped the isolate, there is no persistent state to exfiltrate — no long-running process, no shared memory between requests.

---

## What User Code Cannot Do

| Action | Blocked by |
|---|---|
| Read `process.env` | isolated-vm (no `process`) |
| `require()` a module | isolated-vm (no `require`) |
| Read the filesystem | isolated-vm (no `fs`) |
| Make HTTP requests | isolated-vm (no `fetch`/`XMLHttpRequest`) |
| Infinite loop by real timer | Fake timer stubs (no real `setTimeout`) |
| Exhaust memory | `memoryLimit: 64` on the Isolate |
| Run indefinitely | `timeout: 5000` on `context.eval` |
| Pollute host prototype | Isolated V8 heap (no shared references) |

---

## Adding New `expect` Matchers

All matchers (`toBe`, `toEqual`, etc.) are implemented inside the `TEST_RUNNER_PREAMBLE` string in `src/server/actions/execute.ts`. They cannot call external functions — everything must be expressible in plain ES5/ES6 JavaScript within the string. Add new matchers to the `m` object inside the `expect` function in that file.

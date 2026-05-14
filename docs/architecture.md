# Architecture

## Overview

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│  Monaco Editor  │  React UI  │  Zustand Store           │
└────────────────────────┬────────────────────────────────┘
                         │ Next.js Server Actions (HTTPS)
┌────────────────────────▼────────────────────────────────┐
│                  Next.js App Router                      │
│  Server Components  │  Server Actions  │  API Routes     │
└──────┬─────────────────────┬───────────────────┬────────┘
       │                     │                   │
┌──────▼──────┐   ┌──────────▼────────┐  ┌──────▼──────┐
│   Appwrite  │   │    isolated-vm    │  │    Redis    │
│  Auth + DB  │   │  esbuild + V8     │  │   Cache     │
└─────────────┘   └───────────────────┘  └─────────────┘
```

---

## Frontend Layer

- **App Router pages** (`src/app/`) — server components by default; data fetched in async RSCs.
- **Client components** (`src/ui/components/`) — tiered: `core/` atoms → `common/` layout → `modules/` features.
- **Zustand store** (`src/ui/store/challenge.store.ts`) — challenge editor state: `userCode`, `userInput`, `consoleLogs`, `testOutput`, `testOutputs`.
- **React Query** — server-fetched data: solve status, submission history.
- **Monaco Editor** — code input; `onMount` restores from localStorage; `onChange` syncs to store.

---

## Server Layer

- **Server Actions** (`src/server/actions/`) — `auth.ts`, `challenge.ts`, `execute.ts`, `submissions.ts`, `user.ts`.
- **Data-access** (`src/server/data-access/`) — pure DB/Redis query functions called only by actions.
- **Services** (`src/server/services/`) — Appwrite client classes (`SessionClientAppwrite`, `AdminClientAppwrite`, `AdminDatabaseClientAppwrite`), Redis singleton (ioredis). `AdminDatabaseClientAppwrite` uses the server API key — no session required, used for public data reads.
- **Config** (`src/server/config/`) — collection IDs and server constants.
- **Utils** (`src/server/utils/`) — server-only helpers including `cache.ts` (Redis cache-aside utilities).

---

## Code Execution Pipeline

```
1. User types in Monaco editor
        ↓
2. onChange → setUserCode(code) → Zustand store
        ↓
3. User clicks "Run" → Executor component
        ↓
4. useTransition → executeTests(userCode, testCode, solution)
        ↓  [Server Action — server boundary]
5. esbuild.build({ stdin: testCode, bundle: true, format: "cjs", write: false })
   Virtual plugin resolves ./code → userCode, ./solution → solutionCode
        ↓
6. new ivm.Isolate({ memoryLimit: 64 })
   context.eval(TEST_RUNNER_PREAMBLE + bundle)
   context.eval(POST_BUNDLE_RUNNER, { promise: true })
        ↓
7. JSON.stringify(__results) → parsed TestOutputProps[]
   JSON.stringify(__consoleLogs) → string[]
        ↓  [back across server boundary]
8. setOutputs(results) → Zustand store → UI re-render
```

---

## Authentication Flow

1. User submits email/password → `signIn()` server action → Appwrite `createEmailPasswordSession`.
2. Appwrite sets a session cookie (name from `COOKIE_NAME` env var).
3. `getLoggedInUser()` reads cookie and calls Appwrite `account.get()` on every protected request.
4. `AppProvider` context wraps the app, passes `user` down via React context.
5. Logout → `signOut()` server action → Appwrite `deleteSession`.

---

## Challenge Data Flow

```
src/common/challenges/{id}.ts   ← static definition (problem, code, solution, testCases)
        ↓
src/common/challenges/index.ts  ← registry (id, name, difficulty, tags)
        ↓
challenge-loader (server)       ← dynamic import by ID, validated with isValidChallengeId()
        ↓
challenge-ui.tsx                ← passes code/solution/testCode/testCases to ChallengeEditor
        ↓
executor.tsx                    ← calls executeTests() with userCode from store
```

---

## State Management

| State | Store | Purpose |
|---|---|---|
| `userCode` | Zustand | Current editor content |
| `userInput` | Zustand | User-provided function arguments |
| `consoleLogs` | Zustand | Captured console output from isolate |
| `testOutput` | Zustand | Single-test run result |
| `testOutputs` | Zustand | All test cases result |
| Solve status | React Query | Fetched from Appwrite, cached |
| Submissions | React Query | Fetched from Appwrite, cached |
| Auth user | Context | From `AppProvider`, set on mount |

---

## Challenge Stats Caching

Views and attempts are ephemeral (Redis-only, reset to 0 on restart). Likes and solves are persisted to `CHALLENGE_INFO_COLLECTION` in Appwrite as a source of truth.

```
Read path (getLikes / getSolves):
  Redis HIT  → safeCount(cached) → return
  Redis MISS → getStatsFromDB() → SET Redis → return DB value

Write path (updateLikes / incrementSolves):
  ensureCacheSeeded() → seed Redis from DB if key missing
  INCR / DECR Redis
  incrementStatInDB / decrementStatInDB → fire-and-forget (never blocks response)

safeCount: clamps NaN, null, negative → 0 (prevents -1 / NaN in UI)
```

| Counter | Persistence | On Redis restart |
|---|---|---|
| `views` | Redis only | Resets to 0 |
| `attempts` | Redis only | Resets to 0 |
| `likes` | Redis + Appwrite DB | Survives — seeded from DB |
| `solves` | Redis + Appwrite DB | Survives — seeded from DB |

Helpers live in `src/server/utils/cache.ts`: `safeCount`, `getFromCacheOrDB`, `ensureCacheSeeded`.

---

## Infrastructure

| Service | Provider | Notes |
|---|---|---|
| Hosting | Vercel (serverless) | Each invocation is ephemeral |
| Database + Auth | Appwrite (BaaS) | Collections: users, submissions |
| Cache | Redis Cloud (ap-south-1) | ioredis, challenge metadata caching |
| CI | GitHub Actions | Validates challenge solutions on PR |

---

## External Package Config

```ts
// next.config.ts
serverExternalPackages: ["esbuild", "isolated-vm"]
```

Both packages include native binaries (`.node` files) and cannot be bundled by Webpack/Turbopack. This config tells Next.js to leave them as external `require()` calls so Node resolves them at runtime.

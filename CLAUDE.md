# ClearFrontend — Agent Instructions

> This file is read natively by **Claude Code**. Identical content lives in `AGENTS.md` for cross-agent compatibility (OpenAI Codex, etc.).

## Project Overview

ClearFrontend is a Next.js 15 coding challenge platform where users solve JavaScript/TypeScript problems and get instant feedback. Code is executed server-side inside a true V8 isolate (`isolated-vm` + `esbuild`) — no external judge service, no sandboxed iframe. The backend uses Appwrite (auth + database), Redis (caching), and Vercel (deployment).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + SCSS Modules + Radix UI Themes |
| State | Zustand 5 (Immer), React Query 5 |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| Execution | `isolated-vm` 6 + `esbuild` 0.28 |
| Backend | Appwrite (BaaS) + ioredis |
| Testing | Vitest 4 |

## Key Paths

```
src/app/          Pages and layouts (Next.js App Router)
src/server/       Server-only code — never imported by client components
  actions/        Next.js Server Actions ("use server")
  data-access/    DB queries (Appwrite / Redis)
  services/       External service clients
src/ui/           React components and client-side code
  components/core/      Reusable atoms (no domain knowledge)
  components/common/    Layout and navigation
  components/modules/   Feature-specific components
  store/          Zustand stores
  context/        React context providers
src/common/       Zero-dependency shared code (types, challenge data, routes)
  challenges/     Challenge definitions ({id}.ts)
  types/          Shared TypeScript types
scripts/          CLI utilities (validate-challenges.js)
```

## Server Actions Rules

- Always `"use server"` at the top of action files.
- Validate all inputs — use `isValidChallengeId()` for challenge IDs.
- Never expose raw DB or internal errors to the client.
- Pattern: **validate → authorize → data-access → return**.
- Use `respondWithError` for structured error responses.

## Challenge Authoring Rules

Every challenge file (`src/common/challenges/{id}.ts`) must export a `problem` object with:

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique integer, matches filename |
| `name` | Yes | Display name |
| `statement` | Yes | HTML string, short |
| `description` | Yes | HTML string, longer explanation |
| `difficulty` | Yes | `"easy"` \| `"medium"` \| `"hard"` |
| `languages` | Yes | `["javascript"]` |
| `examples` | Yes | Array of `{ input, output }` |
| `sampleInput` | Yes | Default input string |
| `code` | Yes | Starter code with `export default` |
| `solution` | Yes | Reference solution with `export default` |
| `testCases` | Yes | Vitest test string |
| `testCode` | Yes | Function returning test string from user input |

**Critical rules:**
- Never use backticks inside `testCases` or `testCode` template literals — they break the string boundary.
- Timer-based tests **must** call `jest.useFakeTimers()` in `beforeEach` (CI runs Vitest directly, not inside isolated-vm).
- Solutions must **not** reference `__currentTime` — that global only exists inside isolated-vm.
- Register every new challenge in `src/common/challenges/index.ts`.

## Execution Engine Rules

File: `src/server/actions/execute.ts`

- `TEST_RUNNER_PREAMBLE` is a string injected before the esbuild bundle. If you change it, also update `POST_BUNDLE_RUNNER` to stay consistent.
- `__advanceTime(ms)` has a safety limit of **10,000 iterations** to prevent infinite loops. The `jest.runAllTimers()` alias advances by **86,400,000 ms** (24h ceiling).
- Always call `isolate.dispose()` in the `finally` block — isolates leak memory if not disposed.
- `POST_BUNDLE_RUNNER` must end with `.then(() => null)` — isolated-vm cannot transfer arrays/objects across the isolate boundary; the Promise must resolve with a primitive.
- esbuild runs with `write: false` — all bundling is in-memory, never touching disk.

## CI Rules

- `.github/workflows/validate-challenges.yml` triggers on PRs to `main` for changes under `src/common/challenges/`.
- `scripts/validate-challenges.js` uses **Vitest** (not isolated-vm) to run challenge `testCases` against the `solution`.
- Solutions that use `__currentTime` will fail CI because that global doesn't exist in Vitest.
- Timer challenges need `jest.useFakeTimers()` in `beforeEach` because Vitest requires explicit activation.

## Forbidden Patterns

- No `any` without a `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comment and a reason.
- No `console.log` in committed server-side code.
- No `vm` module — use `isolated-vm` for true V8 isolation (see `docs/security_ai.md`).
- No mutation of Zustand state outside of store setter functions.
- No barrel `index.ts` re-exports inside component folders.

## Component Rules

- Named exports only for React components — no default exports.
- Props interface defined above the component in the same file.
- CSS Modules for component-scoped styles (`component-name.module.scss`).
- No inline `style={{}}` objects.
- `"use client"` only when the component uses hooks, browser APIs, or event handlers.

## Store Rules

- Use Immer (`produce`) for nested state updates.
- Use nullish coalescing (`??`) for partial updates (preserve existing values when field is omitted).
- Provide reset functions for cleanup on unmount.

## Redis / Stats Rules

- `views` and `attempts` are Redis-only counters — they reset to 0 on Redis restart (acceptable).
- `likes` and `solves` are persisted to `CHALLENGE_INFO_COLLECTION` as source of truth — use the cache-aside helpers in `src/server/utils/cache.ts`.
- Never write raw Redis counter logic inline — use `getFromCacheOrDB` and `ensureCacheSeeded` from `cache.ts`.
- Use `serviceClient.adminDatabase()` (API key, no session) for stats reads — stats are public and must work without a logged-in user.
- Use `serviceClient.database()` (session) for user-owned data (submissions, user-challenge info).

## Further Reading

- `docs/architecture.md` — system design and data flows
- `docs/security_ai.md` — isolated-vm security model
- `docs/rules/coding-guidelines.md` — TypeScript and React standards
- `docs/rules/folder-structure.md` — directory conventions
- `docs/rules/component-guidelines.md` — component creation patterns
- `docs/skills.md` — required knowledge and learning resources

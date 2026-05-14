# Coding Guidelines

TypeScript, React, and Next.js standards for ClearFrontend.

---

## TypeScript

- `strict: true` is required — all strictness flags are on.
- Use `interface` for object shapes; use `type` for unions and aliases.
- Use `enum` for fixed string sets (e.g., `Difficulty`).
- Use `unknown` for caught errors, not `any`:
  ```ts
  catch (e) {
    const message = e instanceof Error ? e.message : String(e);
  }
  ```
- No `any` without an explicit disable comment plus a reason:
  ```ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = value as any; // reason: third-party type gap
  ```

---

## Naming

| Kind | Convention | Example |
|---|---|---|
| Components, types, enums | PascalCase | `ChallengeEditor`, `Difficulty` |
| Functions, variables | camelCase | `getUserCode`, `isLoading` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Files and directories | kebab-case | `challenge-editor.tsx`, `data-access/` |
| CSS Module classes | camelCase | `styles.codePanel` |

---

## React

- **Named exports only** for components — never default export a component.
- Define a `Props` or `interface Props` above the component in the same file.
- Use `forwardRef` when exposing an imperative handle (e.g., Monaco's `updateCode`).
- No inline `style={{}}` objects — use CSS Modules or Tailwind classes.
- Prefer `useTransition` over manual `useState` loading flags for Server Action calls:
  ```ts
  const [isPending, startTransition] = useTransition();
  startTransition(async () => {
    const result = await executeTests(userCode, testCode, solution);
    setOutputs(result);
  });
  ```

---

## Server Actions

- `"use server"` directive at the top of every action file.
- Validate all inputs before any DB call. Use `isValidChallengeId()` for challenge IDs.
- Never expose raw DB or Appwrite errors — catch and return structured errors.
- Pattern:
  ```ts
  "use server";
  export async function myAction(id: number) {
    if (!isValidChallengeId(id)) return respondWithError("Invalid ID");
    // authorize
    const user = await getLoggedInUser();
    if (!user) return respondWithError("Unauthorized");
    // data-access
    return await getChallenge(id);
  }
  ```

---

## Next.js

- Server components by default — no directive needed.
- Add `"use client"` only when the component uses:
  - React hooks (`useState`, `useEffect`, `useContext`, etc.)
  - Browser-only APIs (`localStorage`, `window`, `document`)
  - Event handlers that trigger re-renders
  - Zustand store access
- Async server components for data fetching (no `useEffect` + fetch in RSCs).
- Call `notFound()` for invalid route params rather than returning empty state.

---

## Imports

- Use the `@/*` path alias for all internal imports (maps to `src/*`).
- No relative `../../` imports — use `@/` always.
- Import order: **external packages → internal modules → types**.
  ```ts
  import { create } from "zustand";       // external
  import { executeTests } from "@/server/actions/execute"; // internal
  import type { TestOutputProps } from "@/common/types/test"; // types
  ```

---

## Comments

- Write no comments on obvious code.
- Comment only when the **why** is non-obvious: a hidden constraint, a workaround for a specific bug, a subtle invariant.
- No TODO comments in committed code.
- No multi-line comment blocks explaining what the code does.

---

## Error Handling

- Never swallow errors silently — always log or return them.
- Use `respondWithError` in Server Actions for structured error responses.
- In the execution engine, always `finally { isolate.dispose() }` — isolates leak memory if not disposed.
- `unknown` for caught error type, then narrow with `instanceof Error`.

---

## State

| Use case | Solution |
|---|---|
| Challenge editor state | Zustand (`challenge.store.ts`) |
| Server-fetched data (solve status, submissions) | React Query |
| Auth user | React Context (`AppProvider`) |
| Component-only UI state (open/closed, hover) | Local `useState` |

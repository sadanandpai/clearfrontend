# Skills & Learning Resources

Required knowledge for contributing to ClearFrontend.

---

## Core Technologies

### Next.js 15 App Router
- Server Components vs Client Components — default to server, add `"use client"` only when necessary
- Server Actions — `"use server"` directive, form actions, `useTransition`
- Route groups `(group)`, dynamic segments `[id]`, layouts, `notFound()`
- Docs: https://nextjs.org/docs/app

### React 19
- `useTransition` for async server action calls (replaces manual loading state)
- `forwardRef` + `useImperativeHandle` for exposing imperative handles
- Server Component composition patterns
- Docs: https://react.dev

### TypeScript 5 (strict mode)
- `strict: true` — all strictness flags enabled
- Interfaces for object shapes, enums for string unions, `unknown` over `any`
- Generic constraints, utility types (`Partial`, `Pick`, `Omit`, `ReturnType`)
- Docs: https://www.typescriptlang.org/docs/

### Zustand 5 + Immer
- `create` with TypeScript interface, `set` and `get`
- `produce` (Immer) for nested state updates
- Nullish coalescing (`??`) for partial updates
- Docs: https://zustand.docs.pmnd.rs/

### React Query (TanStack Query 5)
- `useQuery` for server data fetching with cache
- `queryClient.invalidateQueries` after mutations
- Docs: https://tanstack.com/query/latest

---

## Backend

### Appwrite
- Collections, documents, indexes
- Email/password sessions, OAuth
- `node-appwrite` SDK — `Databases`, `Account`, `Users`, `Client`
- Docs: https://appwrite.io/docs

### Redis (ioredis)
- Basic get/set/setex with JSON serialization
- Cache-aside pattern: check cache → miss → fetch DB → populate cache
- Docs: https://github.com/redis/ioredis

### Next.js Server Actions Pattern
- File-level `"use server"` directive
- Input validation with Zod before any DB call
- Structured return types (never throw raw errors to client)

---

## Execution Engine

### esbuild
- Bundle API: `esbuild.build()` options — `stdin`, `bundle`, `format`, `platform`, `write`, `plugins`
- Virtual plugins: intercept `onResolve` + `onLoad` to serve in-memory content
- `format: "cjs"` produces a CommonJS bundle runnable in isolated-vm
- Docs: https://esbuild.github.io/api/

### isolated-vm
- `new ivm.Isolate({ memoryLimit })` — creates an independent V8 heap
- `isolate.createContext()` — creates an execution context
- `context.eval(code, { timeout, promise })` — runs code; `promise: true` for async
- Memory and CPU limits, `isolate.dispose()` in `finally`
- Docs: https://github.com/laverdet/isolated-vm

---

## Styling

### Tailwind CSS v4
- Utility classes for layout, spacing, typography
- Config in `tailwind.config.ts`; custom tokens via CSS variables
- Docs: https://tailwindcss.com/docs

### SCSS Modules
- `component-name.module.scss` scoped to component
- Import shared tokens: `@use "@/ui/styles/variables" as *`
- Mixins: `@use "@/ui/styles/mixins" as *`
- Class names in camelCase inside modules

### Radix UI Themes
- Use Radix `Button`, `Flex`, `Text`, `Box`, `ScrollArea` etc. for primitives
- `RadixNextLink` wrapper for navigation (never raw `<a>`)
- Theme tokens via CSS custom properties
- Docs: https://www.radix-ui.com/themes/docs

---

## Testing

### Vitest 4 (Jest-compatible)
- Globals: `describe`, `test`, `it`, `expect`, `beforeEach`, `afterEach`
- Fake timers: `jest.useFakeTimers()`, `jest.advanceTimersByTime()`, `jest.runAllTimers()`, `jest.clearAllTimers()`
- Mock functions: `jest.fn()`, `.mock.calls`, `.toHaveBeenCalledWith()`
- Config: `vitest.config.mts`

### Challenge Test Authoring
- `testCases` field: Vitest syntax, imports from `'./code'` and `'./solution'`
- `testCode` field: function `(arg: string) => string` — returns test using the user's input
- Timer tests: always `beforeEach(() => jest.useFakeTimers())` + `afterEach(() => jest.clearAllTimers())`
- No backticks inside template literal strings
- No `__currentTime` — it only exists inside isolated-vm, not Vitest

---

## Key Files to Read First

| File | What you'll learn |
|---|---|
| `src/server/actions/execute.ts` | Complete execution engine: esbuild + isolated-vm + fake timers + jest compat |
| `src/ui/components/modules/challenge/challenge-ui.tsx` | Module component pattern, state wiring |
| `src/ui/store/challenge.store.ts` | Zustand store with Immer, partial updates |
| `src/common/challenges/1.ts` | Minimal challenge authoring example |
| `src/common/challenges/8.ts` | Timer-based challenge with `jest.useFakeTimers()` |
| `src/common/types/challenge.types.ts` | Challenge and filter type definitions |
| `src/server/actions/auth.ts` | Server Action pattern with validation |

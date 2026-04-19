# Folder Structure

Directory conventions and naming rules for ClearFrontend.

---

## Root Structure

```
clearfrontend/
├── CLAUDE.md                   Agent rules (Claude Code)
├── AGENTS.md                   Agent rules (cross-agent / OpenAI Codex)
├── next.config.ts
├── tsconfig.json
├── vitest.config.mts
├── package.json
├── .nvmrc                      Node version (24.11.1)
├── .github/
│   └── workflows/
│       └── validate-challenges.yml
├── scripts/
│   └── validate-challenges.js  CI challenge validation
├── docs/                       Project documentation
│   ├── index.md
│   ├── architecture.md
│   ├── security_ai.md
│   ├── skills.md
│   └── rules/
│       ├── coding-guidelines.md
│       ├── folder-structure.md
│       └── component-guidelines.md
└── src/
    ├── app/                    Next.js App Router
    ├── common/                 Shared, zero-dependency code
    ├── server/                 Server-only code
    └── ui/                     React components and client code
```

---

## `src/app/`

Pages and layouts only — no business logic lives here.

```
src/app/
├── layout.tsx                  Root layout (providers, metadata)
├── page.tsx                    Home page (server component)
├── (auth)/                     Route group — shared auth layout
│   ├── login/page.tsx
│   └── register/page.tsx
└── challenges/
    ├── page.tsx                Challenge list
    └── [id]/
        └── page.tsx            Individual challenge (async server component)
```

Rules:
- Async server components fetch data directly (no client-side useEffect).
- Route groups `(group)` share a layout without affecting the URL.
- No business logic or direct DB calls — delegate to Server Actions and data-access layer.

---

## `src/common/`

Zero dependency on Next.js or React. Safe to import from anywhere (server, client, scripts).

```
src/common/
├── challenges/
│   ├── index.ts                Registry: array of { id, name, difficulty, tags }
│   ├── 1.ts                    Challenge definition
│   ├── 2.ts
│   └── ...
├── test-codes/
│   └── index.ts                defaultTestCode and helpers
├── types/
│   ├── challenge.types.ts      Challenge, Difficulty, ChallengeFilters
│   └── test.ts                 TestOutputProps, OutputStateProps
└── routes.ts                   App route constants
```

---

## `src/server/`

**Never imported by client components.** All server-side code lives here.

```
src/server/
├── actions/                    Next.js Server Actions ("use server")
│   ├── auth.ts
│   ├── challenge.ts
│   ├── execute.ts              Execution engine (isolated-vm + esbuild)
│   ├── submissions.ts
│   └── user.ts
├── data-access/                Pure DB query functions
│   ├── session.ts              Auth session CRUD (Appwrite Account)
│   ├── submissions.ts          Submission CRUD (Appwrite Databases)
│   ├── user-challenge.ts       Per-user challenge info (like, solve flags)
│   ├── activities.ts           Counter reads/writes — Redis-primary, DB fallback for likes/solves
│   └── challenge-stats.ts      DB persistence layer for likes/solves (CHALLENGE_INFO_COLLECTION)
├── services/                   External service clients
│   ├── appwrite.ts             Appwrite client classes (Base, Session, Admin, AdminDatabase)
│   ├── service_client.ts       ServiceClient facade — .user, .database(), .adminDatabase(), .cache()
│   └── redis.ts                Redis singleton (ioredis)
├── config/                     Env var and constant config
│   ├── appwrite.config.ts      DB and collection IDs
│   ├── redis.config.ts         Redis connection config
│   └── server.config.ts        Cookie name, host URL
└── utils/                      Server-only helpers
    ├── cache.ts                 Redis cache-aside utils: safeCount, getFromCacheOrDB, ensureCacheSeeded
    ├── challenge.ts             isValidChallengeId
    ├── challenge-loader.ts      Dynamic challenge import by ID
    ├── cookies.ts               getCookie / createCookie / deleteCookie
    ├── parser.ts                Form input validation helpers
    └── url.ts                   URL construction helpers
```

Sub-layer rules:
- `actions/` — orchestrates: validate → authorize → call data-access → return.
- `data-access/` — only DB/Redis calls; no auth logic, no HTTP context.
- `services/` — initializes and exports clients (singleton pattern). `adminDatabase()` uses API key (no session required — for public data reads).
- `config/` — collection IDs and env constants; never computed at runtime.
- `utils/cache.ts` — generic Redis helpers; import here instead of writing cache logic inline.

---

## `src/ui/`

All React components and client-side code.

```
src/ui/
├── components/
│   ├── core/                   Reusable atoms — no domain knowledge
│   │   ├── editor/
│   │   │   ├── monaco-editor.tsx
│   │   │   └── monaco-editor.module.scss
│   │   └── ...
│   ├── common/                 Layout and navigation — no feature logic
│   │   ├── header/
│   │   └── footer/
│   └── modules/                Feature-specific components
│       └── challenge/
│           ├── challenge-ui.tsx                Root layout
│           ├── challenge-sections/             Major panels
│           │   ├── challenge-details/
│           │   └── challenge-editor/
│           ├── challenge-components/           Interactive units
│           │   └── executor/
│           └── challenge-elements/             Display units
│               ├── challenge-console/
│               └── challenge-input/
├── store/
│   └── challenge.store.ts
├── context/
│   └── app.context.tsx
├── providers/
│   └── app-provider.tsx
├── utils/                      UI-only helpers (no server imports)
└── styles/
    ├── _variables.scss
    ├── _mixins.scss
    └── globals.scss
```

---

## Component Folder Convention

Each component lives in its own folder:

```
component-name/
├── component-name.tsx          Named export: export function ComponentName
└── component-name.module.scss  Optional: scoped styles
```

Rules:
- Folder name = kebab-case version of the component name.
- No barrel `index.ts` files inside component folders.
- Import directly: `import { MonacoEditor } from "@/ui/components/core/editor/monaco-editor"`.

---

## Challenge Files

- Path: `src/common/challenges/{id}.ts`
- Named export: `export const problem = { ... }`
- Register in `src/common/challenges/index.ts` with `{ id, name, difficulty, tags }`

---

## Naming Rules Summary

| Item | Convention |
|---|---|
| Files | `kebab-case.tsx` / `kebab-case.ts` |
| Directories | `kebab-case/` |
| React components | `PascalCase` named export |
| CSS Module classes | `camelCase` |
| Server Action files | noun (`auth.ts`, `challenge.ts`, `user.ts`) |
| Challenge files | numeric ID (`17.ts`) |

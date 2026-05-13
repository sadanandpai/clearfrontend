# ClearFrontend Documentation

ClearFrontend is a Next.js 15 coding challenge platform. Users solve JavaScript problems

---

## For Developers

| Document | Description |
|---|---|
| [Architecture](architecture.md) | System design, tech stack, data flows, ASCII diagram |
| [Folder Structure](rules/folder-structure.md) | Directory conventions and naming rules |
| [Coding Guidelines](rules/coding-guidelines.md) | TypeScript, React, Next.js standards |
| [Component Guidelines](rules/component-guidelines.md) | Component creation and design patterns |
| [Skills](skills.md) | Required knowledge and learning resources |

## For AI Agents

| Document | Description |
|---|---|
| [CLAUDE.md](../CLAUDE.md) / [AGENTS.md](../AGENTS.md) | Agent rules: forbidden patterns, authoring rules, CI rules |
| [Security Model](security_ai.md) | isolated-vm threat model and security boundaries |

---

## Quick Start

```bash
node --version   # must be >= 24.11.1 (see .nvmrc)
npm install
npm run dev      # http://localhost:3000
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API URL |
| `NEXT_PUBLIC_APPWRITE_PROJECT` | Appwrite project ID |
| `APPWRITE_KEY` | Appwrite server-side API key |
| `REDIS_URL` | Redis connection string (ioredis format) |
| `COOKIE_NAME` | Session cookie name |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run Vitest (no watch) |
| `npm run lint` | ESLint |
| `npm run prettier` | Format all files |
| `npm run prettier:check` | Check formatting |

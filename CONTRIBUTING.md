# Contributing

Review the [Code of Conduct](CODE_OF_CONDUCT.md).

## Where to start

View [issues tagged _good first issue_](https://github.com/sadanandpai/clearfrontend/labels/good%20first%20issue) when available, or browse [all issues](https://github.com/sadanandpai/clearfrontend/issues).

---

## Development

### Prerequisites

- **Node.js** `>= 24.11.1` (see `package.json` → `engines` and Volta pin)
- **npm** (this repo ships `package-lock.json`; you can use `pnpm` or `yarn` if you prefer and know how to translate commands)

### Clone and install

1. Open a terminal in the directory where you keep projects.
1. Clone the repo  
   ```bash
   git clone https://github.com/sadanandpai/clearfrontend.git
   cd clearfrontend
   ```
1. Install dependencies  
   ```bash
   npm install
   ```

### Appwrite (account, project, database schema, API key)

There is no checked-in Appwrite export in this repository. You need a **Cloud** ([cloud.appwrite.io](https://cloud.appwrite.io)) or self-hosted Appwrite instance, then mirror the schema below.

1. **Account & project** — Sign up, create a **Project**, note the **Project ID** (Settings → General).
1. **API endpoint** — Copy the **API Endpoint** URL (same settings area). Local development usually uses the cloud endpoint, not `localhost`, unless you self-host Appwrite.
1. **Auth** — In **Auth**, enable **Email/Password** (and optionally **Google** / **GitHub** if you will test OAuth). Under **Auth** → **URLs**, add your app origin (e.g. `http://localhost:3000`) and redirect URLs your code uses (see `src/server/config/server.config.ts` for `HOST_URL` / OAuth callbacks if you change them).
1. **Database** — Create a database. Copy its **Database ID**.
1. **Collections & attributes** — Create the collections and attributes in the table below. You may use any **Collection name** you like; copy each collection’s **ID** from the Appwrite console after creation.

   | Collection purpose   | Suggested collection ID | Attributes (key → type) |
   | -------------------- | ------------------------ | ------------------------- |
   | Submissions          | (auto or custom)         | `cId` → Integer, `code` → String (size large enough for solutions), `status` → Boolean |
   | Challenge stats      | (auto or custom)         | `cId` → Integer, `likes` → Integer, `solves` → Integer |
   | User ↔ challenge     | (auto or custom)         | `cId` → Integer, `like` → Boolean, `solve` → Boolean |
   | Code shares          | **`code_shares`** (recommended custom ID) | `userId` → String, `cId` → Integer, `code` → String, `expiresAt` → DateTime |

   **Permissions (development):** start permissive so the app can read/write with the session user and the server API key. For example, for **Submissions** and **User challenge info**, allow **Create / Read / Update / Delete** for **Users** (or **Any** for a throwaway dev project only). **Challenge stats** and **Code shares** are accessed with the **server API key** (`adminDatabase`); grant that key access via collection **Permissions** (read/write for relevant roles) as required by your Appwrite version. Tighten permissions before production.

1. **Wire IDs into the repo** — Open `src/server/config/appwrite.config.ts` and set `DB` and each collection constant to the **Database ID** and **Collection IDs** from your project. If you did not use the custom ID `code_shares` for code shares, set `CODE_SHARE_COLLECTION` to whatever ID Appwrite assigned.

### API key

1. In Appwrite: **Overview** → **Integrations** (or **API Keys**), **Create API Key**.
1. Give it a name (e.g. `clearfrontend-dev`).
1. Enable scopes needed for server-side use: at minimum **Databases** (read + write), **Users** (read + write), and anything your Appwrite version lists for **Sessions** / **Account** used by `node-appwrite` in `src/server/services/appwrite.ts` and `src/server/data-access/session.ts`. For local development, a **Server**-style key with broad access is acceptable; never commit it or use production keys in a fork.

### Environment variables

Create **`.env.local`** in the project root (Next.js loads it automatically). Do not commit secrets.

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Yes | Appwrite API endpoint URL (exposed to the browser for the client SDK path). |
| `NEXT_APPWRITE_PROJECT` | Yes | Appwrite project ID. |
| `NEXT_APPWRITE_KEY` | Yes | Server API key (secret). Used only on the server. |
| `NEXT_REDIS_PASSWORD` | If your Redis uses auth | Redis password for `ioredis` in `src/server/services/redis.ts`. |

**Redis host and port** are not read from `.env` in this codebase; they live in `src/server/config/redis.config.ts`. Point `REDIS_HOST` / `REDIS_PORT` at your instance (local Docker, Redis Cloud, etc.) and set `NEXT_REDIS_PASSWORD` when a password is required.

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks: `npm run lint`, `npm run test`, and `node scripts/validate-challenges.js` when you touch challenges (see `AGENTS.md`).

---

## Proposing a new challenge (contribution)

New challenges are TypeScript modules under [`src/common/challenges/`](src/common/challenges/) — for example [`src/common/challenges/1.ts`](src/common/challenges/1.ts), which exports a `problem` object (`id`, `name`, `statement`, `description`, `difficulty`, `languages`, `examples`, `sampleInput`, `code`, `solution`, `testCases`, `testCode`). Every field is required; authoring rules, CI behavior, and forbidden patterns are in [`AGENTS.md`](AGENTS.md) (**Challenge Authoring Rules** and **CI Rules**).

### Before you invest in a full PR

1. **Search** — [Existing issues](https://github.com/sadanandpai/clearfrontend/issues) and the [`src/common/challenges/`](src/common/challenges/) folder so we do not duplicate an idea or ID.
1. **Open a challenge proposal** — Use [**New issue → Challenge proposal**](https://github.com/sadanandpai/clearfrontend/issues/new?template=challenge_proposal.md) (or **New issue** → choose **Challenge proposal** from the list). Title with prefix **`[Challenge]`** and a short name (e.g. `[Challenge] Sliding window maximum`).
1. **Describe the problem for reviewers**, not only the solution:
   - Working **title** and a **one-line statement** of what the user must implement.
   - **Difficulty** (`easy` | `medium` | `hard`).
   - **Examples** (input → expected output), same spirit as the `examples` array in a challenge file.
   - **Edge cases / constraints** (bounds, empty input, performance). If the problem uses timers, call out that `testCases` must use `jest.useFakeTimers()` in `beforeEach` per `AGENTS.md`.
   - Optional: rough **test plan** for `testCases`, or note that tests will follow the reference `solution`.

Maintainers can confirm scope, difficulty, and fit before you write HTML, starter code, and Vitest strings.

### Implementing the challenge in a PR

1. Choose the next unused numeric **`id`**, add `src/common/challenges/{id}.ts`, and **register** it in [`src/common/challenges/index.ts`](src/common/challenges/index.ts).
1. Follow `AGENTS.md` strictly: e.g. no backticks inside `testCases` / `testCode` template literals, reference `solution` must not use `__currentTime`, timer-based tests must activate fake timers in `beforeEach`.
1. Run validation before opening the PR:  
   `node scripts/validate-challenges.js src/common/challenges/{id}.ts`

Link the PR to the challenge proposal issue when one exists.

### General setup questions

For local env, Appwrite, or Redis—not challenge design—use [**Question**](https://github.com/sadanandpai/clearfrontend/issues/new?template=question.md) or see the **Development** section above.

---

## Submit a change

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo.
1. Clone your fork and add `upstream` if you plan to sync often.  
   ```bash
   git clone https://github.com/YOUR_USERNAME/clearfrontend.git
   cd clearfrontend
   ```
1. Install dependencies: `npm install`
1. Create a branch:  
   ```bash
   git switch -c your-branch-name
   ```
1. Make changes, then `npm run lint` / `npm run test` as appropriate.
1. Commit with a message that explains the change.  
   ```bash
   git commit -am "Add concise description of the change"
   ```
1. Push and open a **Pull Request** against the `main` branch of the upstream repo.  
   ```bash
   git push origin your-branch-name
   ```

Maintainers will review and merge when it fits the project goals.

# Contributing

Review the [Code of Conduct](CODE_OF_CONDUCT.md).

## Where to start

View [issues tagged _good first issue_](https://github.com/sadanandpai/clearfrontend/labels/good%20first%20issue) when available, or browse [all issues](https://github.com/sadanandpai/clearfrontend/issues).

---

## Development

### Prerequisites

- **Node.js** `>= 24.11.1`
- **Appwrite Setup**
- **Redis Setup**

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

### Appwrite

There is no checked-in Appwrite backup. Follow **[docs/setup-appwrite.md](docs/setup-appwrite.md)**—it walks through project, auth, database, four collections, permissions, `appwrite.config.ts`, API key, and `.env` in order.

### Environment variables

From the project root, copy the template and fill in your values:

```bash
cp .env.example .env
```

Next.js loads `.env` automatically. Open `.env` and complete any empty values; each variable is described in the comments at the top of [`.env.example`](.env.example). Do not commit `.env` or other files that contain secrets (they stay gitignored).

### Redis via Upstash

This project uses Upstash Redis for caching. To set it up:

1. Create a free account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the **REST URL** and **REST Token** from your database dashboard
4. Add them to your `.env` file:

```
UPSTASH_REDIS_REST_URL=your_rest_url_here
UPSTASH_REDIS_REST_TOKEN=your_rest_token_here
```

For Vercel deployments, these variables are automatically read from the environment using `Redis.fromEnv()`.

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

1. Choose the next unused numeric **`id`**, add `src/common/challenges/{id}.ts`, and append a matching row to the **`challenges`** array in [`src/common/challenges/index.ts`](src/common/challenges/index.ts) (`id`, `name`, `difficulty`, `tags`—same shape as the existing entries).
1. Follow `AGENTS.md` strictly: e.g. no backticks inside `testCases` / `testCode` template literals, reference `solution` must not use `__currentTime`, timer-based tests must activate fake timers in `beforeEach`.
1. Run validation before opening the PR:  
   `node scripts/validate-challenges.js src/common/challenges/{id}.ts`

Link the PR to the challenge proposal issue when one exists.

### General setup questions

For local env, Appwrite, or Redis—not challenge design—use [**Question**](https://github.com/sadanandpai/clearfrontend/issues/new?template=question.md), **[docs/setup-appwrite.md](docs/setup-appwrite.md)**, or the **Development** section above.

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

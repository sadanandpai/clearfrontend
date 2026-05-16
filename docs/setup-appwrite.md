# Appwrite setup (local development)

The app does **not** ship an Appwrite export. You create a small project in [Appwrite Cloud](https://cloud.appwrite.io) (or self-host), then copy a handful of IDs into this repo.

**When you are done, you should have:**

- [ ] A `.env` file (from [`.env.example`](../.env.example)) with endpoint, project ID, and API key
- [ ] `src/server/config/appwrite.config.ts` updated with your database ID and four collection IDs

---

## 1. Create a project

1. Sign up at [cloud.appwrite.io](https://cloud.appwrite.io) (or use your own Appwrite server).
1. Create a **new project** (any name).
1. Open **Settings → General** and copy:
   - **Project ID** → you will paste this into `.env` as `NEXT_APPWRITE_PROJECT`.
   - **API Endpoint** → paste into `.env` as `NEXT_PUBLIC_APPWRITE_ENDPOINT` (for Cloud this is usually `https://cloud.appwrite.io/v1`).

---

## 2. Turn on sign-in

1. Go to **Auth → Settings** (or **Auth** in the sidebar, depending on console version).
1. Enable **Email and password** so users can register and sign in.
1. Optional: enable **Google** and/or **GitHub** if you want to test OAuth buttons in the UI.

**URLs for local dev:** Under **Auth** (sometimes **Auth → URLs**), add your local app so redirects work:

- **Site URL:** `http://localhost:3000`
- **Allowed redirect URLs:** include `http://localhost:3000` (OAuth success/failure URLs are built from the browser origin, e.g. `http://localhost:3000/oauth`).

> **Email verification / password reset links** use `HOST_URL` in [`src/server/config/server.config.ts`](../src/server/config/server.config.ts). For production that points at the deployed site; for strict local testing of those emails you may set it to `http://localhost:3000` while developing.

---

## 3. Create one database

1. Open **Databases** → **Create database** (any name).
1. Copy the **Database ID** (string like `67386dba000f93af0abb`). You will put it in `appwrite.config.ts` as `DB`.

---

## 4. Create four collections

Create **four collections** inside that database. Display names can be anything; what matters is each collection’s **ID** and its **attributes**.

| #   | What it is for (in the app)               | Attributes to add (name → type)                                             |
| --- | ----------------------------------------- | --------------------------------------------------------------------------- |
| 1   | User code submissions                     | `cId` → Integer, `code` → String (large size limit), `status` → Boolean     |
| 2   | Challenge stats (likes / solves)          | `cId` → Integer, `likes` → Integer, `solves` → Integer                      |
| 3   | Per-user challenge flags (liked / solved) | `cId` → Integer, `like` → Boolean, `solve` → Boolean                        |
| 4   | Shared code links (expiring)              | `userId` → String, `cId` → Integer, `code` → String, `expiresAt` → DateTime |

**Collection 4 — easy path:** When you create the fourth collection, set its **Collection ID** to exactly `code_shares`. Then you can leave `CODE_SHARE_COLLECTION` as `"code_shares"` in config. If you let Appwrite auto-generate an ID instead, copy that ID into `CODE_SHARE_COLLECTION` in step 6.

After each collection is created, open it and copy its **Collection ID** for step 6.

---

## 5. Permissions (development only)

Until you harden for production, keep rules simple so both **logged-in users** and the **server API key** can work.

- Collections **1** and **3** (submissions and user–challenge): allow **Create / Read / Update / Delete** for **Users** (or, only on a throwaway project, **Any**).
- Collections **2** and **4** (stats and code shares): the backend uses the **API key** (`adminDatabase`). Grant the key **read + write** on those collections (wording varies by Appwrite version—use **Roles** / **Permissions** so your API key role can access the data).

Tighten permissions before any real deployment.

---

## 6. Paste IDs into the repo

Edit [`src/server/config/appwrite.config.ts`](../src/server/config/appwrite.config.ts):

| Constant                    | Paste here                                                                   |
| --------------------------- | ---------------------------------------------------------------------------- |
| `DB`                        | Your **database** ID                                                         |
| `SUBMISSIONS_COLLECTION`    | Collection **1** ID                                                          |
| `CHALLENGE_INFO_COLLECTION` | Collection **2** ID                                                          |
| `CODE_SHARE_COLLECTION`     | Collection **4** ID (or the string `code_shares` if you used that custom ID) |

---

## 7. Create an API key

1. In the console: **Overview** → **Integrations** (or **API Keys**) → **Create API Key**.
1. Name it something like `clearfrontend-local`.
1. Enable scopes your Appwrite version groups under server access, including at least:
   - **Databases** (read and write)
   - **Users** (read and write; needed for sessions and admin user flows used in [`src/server/services/appwrite.ts`](../src/server/services/appwrite.ts) and [`src/server/data-access/session.ts`](../src/server/data-access/session.ts))

Copy the key once and put it in `.env` as `NEXT_APPWRITE_KEY`. **Never commit** this value (use `.env`, gitignored).

---

## 8. Environment file

From the repo root:

```bash
cp .env.example .env
```

Fill in Appwrite fields using the values from steps 1–7. See also the [Environment variables](../CONTRIBUTING.md#environment-variables) subsection in `CONTRIBUTING.md` for Redis-related config.

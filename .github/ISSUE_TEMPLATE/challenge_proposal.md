---
name: Challenge proposal
about: Propose a new coding challenge before (or while) contributing src/common/challenges/{id}.ts
title: "[Challenge] "
labels: ""
assignees: sadanandpai
---

#### Challenge title (working name)

Short name users would see on the challenge list.

#### One-line problem statement

What should the user implement? (Plain text; you will turn this into HTML `statement` / `description` in the PR.)

#### Difficulty

Pick one: `easy` | `medium` | `hard`

#### Examples (input → output)

Like the `examples` array in a challenge file: list a few representative cases.

| Input | Expected output |
| ----- | --------------- |
|       |                 |

#### Edge cases & constraints

Empty inputs, bounds, performance notes, anything tricky. If the problem involves timers, note that CI requires `jest.useFakeTimers()` in `beforeEach` (see `AGENTS.md`).

#### Test ideas (optional)

How you plan to verify the solution in `testCases` (Vitest), or say you will mirror the reference `solution`.

#### Will you open the PR?

- [ ] I plan to submit `src/common/challenges/{id}.ts` + `index.ts` registration
- [ ] I am only proposing the idea; someone else can implement

#### Anything else?

Links to similar problems, prior art, or notes for reviewers.

# Component Guidelines

Component creation and design patterns for ClearFrontend.

---

## Component Tiers

| Tier | Path | Purpose | Can use |
|---|---|---|---|
| `core/` | `src/ui/components/core/` | Reusable atoms | No domain knowledge, no stores, no context |
| `common/` | `src/ui/components/common/` | Layout and navigation | May use auth context, no feature logic |
| `modules/` | `src/ui/components/modules/` | Feature-specific | May use stores, context, Server Actions |

Never import a `modules/` component from `core/` or `common/`.

---

## Creating a New Component

1. Decide the tier (`core`, `common`, or `modules`).
2. Create a folder: `src/ui/components/{tier}/{component-name}/`.
3. Create `{component-name}.tsx` with a named export.
4. Create `{component-name}.module.scss` if styles are needed.
5. Define `interface Props` above the component.
6. No default export.

---

## Component Template

```tsx
"use client"; // only if needed

import styles from "./my-component.module.scss";

interface Props {
  title: string;
  isActive?: boolean;
  onAction: () => void;
}

export function MyComponent({ title, isActive = false, onAction }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
```

---

## Server vs Client

Default to **server component** (no directive). Add `"use client"` only when the component needs:

| Need | Example |
|---|---|
| React hooks | `useState`, `useEffect`, `useRef` |
| Browser APIs | `localStorage`, `window`, `document` |
| Event handlers with state | `onClick` that calls `setState` |
| Zustand store | `useChallengeStore` |
| React context | `useContext(AppContext)` |

If only a small part of a component tree needs client-side features, extract that part into a separate `"use client"` leaf component and keep the parent as a server component.

---

## Styling Rules

- CSS Modules for component-scoped styles.
- Tailwind utilities for layout and spacing (gap, padding, margin, flex, grid).
- SCSS variables via `@use "@/ui/styles/variables" as *`.
- SCSS mixins via `@use "@/ui/styles/mixins" as *`.
- Never inline `style={{}}` objects.
- Never override global class names from other components.

```scss
// challenge-console.module.scss
@use "@/ui/styles/variables" as *;

.wrapper {
  background: $surface-bg;
  padding: 1rem;
}
```

---

## Props Design

- Required props first, optional props last.
- Boolean props use `is` or `has` prefix: `isLoading`, `hasError`, `isActive`.
- Callback props use `on` prefix: `onRun`, `onChange`, `onMount`.
- Children via `React.PropsWithChildren<Props>` when child content is needed:
  ```ts
  interface Props extends React.PropsWithChildren {
    title: string;
  }
  ```
- Avoid passing deeply nested data — prefer flat, specific props.

---

## Radix UI Usage

Use Radix Themes components for UI primitives:

```tsx
import { Button, Flex, Text, ScrollArea, Box } from "@radix-ui/themes";
```

For navigation links, use the `RadixNextLink` wrapper — never raw `<a>` tags with Next.js routing:

```tsx
import { RadixNextLink } from "@/ui/components/common/radix-next-link/radix-next-link";

<RadixNextLink href="/challenges">View challenges</RadixNextLink>
```

---

## Module-Level Component Structure

Feature modules follow a 4-level hierarchy:

```
challenge-ui.tsx                  Root layout — composes sections
  challenge-sections/             Major panels (details, editor)
    challenge-details/
    challenge-editor/
      challenge-components/       Interactive units (executor, timer)
        executor/
      challenge-elements/         Display units (console, input, output)
        challenge-console/
        challenge-input/
```

Rules:
- Root (`challenge-ui.tsx`) handles layout and passes props down.
- Sections own their panel layout.
- Components own interactivity and server action calls.
- Elements are display-only — no server action calls.

---

## useImperativeHandle Pattern

Only used to expose Monaco Editor's `updateCode` API:

```tsx
export interface MonacoEditorHandle {
  updateCode: (code: string) => void;
}

export const MonacoEditor = forwardRef<MonacoEditorHandle, Props>(
  function MonacoEditor({ defaultCode }, ref) {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    useImperativeHandle(ref, () => ({
      updateCode: (code) => editorRef.current?.setValue(code),
    }));

    // ...
  }
);
```

Use `forwardRef` only when exposing an imperative handle — not just to pass a DOM ref.

---

## Performance

- Memoize stable objects with `useMemo` (e.g., Monaco `editorOptions`):
  ```ts
  const editorOptions = useMemo(() => ({ fontSize: 14, minimap: { enabled: false } }), []);
  ```
- Do not create objects or functions inside JSX — they cause unnecessary re-renders.
- Use `useTransition` for Server Action calls so the UI stays interactive during the async operation.
- Use `useCallback` for callbacks passed to child components that are wrapped in `React.memo`.

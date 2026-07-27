# Agent Instructions — react-redux-todo

React 19 + TypeScript + Vite + Redux Toolkit project.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Preview | `npm run preview` |

## Project Structure

```
src/
  components/<domain>/   # React components grouped by feature
  features/redux/
    store.ts             # Redux store
    slices/              # Redux Toolkit slices
```

## Conventions

- **No comments** in code — never add inline comments, block comments, or JSDoc.
- Interfaces are prefixed with `I` (e.g., `ITodo`, `ITodoState`).
- `verbatimModuleSyntax` is enabled — use `import type` for type-only imports (e.g., `import { createSlice, type PayloadAction } from "@reduxjs/toolkit"`).
- Linter is **oxlint**, not ESLint. Run `npm run lint` to check.
- TypeScript strict flags: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` — avoid unused variables and non-erasable TS syntax (e.g., no `enum`, use `const` objects or union types instead).
- Redux state and reducers live in `src/features/redux/slices/`. Use Redux Toolkit's `createSlice`.
- Components are plain function components (`const Foo = () => ...`) with a default export.

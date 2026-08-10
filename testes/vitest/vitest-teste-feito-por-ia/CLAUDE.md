# Project instructions

React 19 + Vite + TypeScript app. Routing uses React Router in **data mode**
(`createBrowserRouter`) with the route table declared in `src/routes.ts`.
HTTP calls use **axios**. Tests run on **Vitest** + React Testing Library.

## Dev server — do not start or stop it

**Never start or stop the dev server.** Do not run `npm run dev`, `npm start`,
`npm run preview`, `vite`, or any equivalent, and do not kill/restart a running
server (`kill`, `pkill`, `taskkill`, `Stop-Process`, `preview_start`,
`preview_stop`). The user runs and stops the server themselves.

If a change needs to be seen in the browser, ask the user to start it:

```bash
npm run dev
```

`npm run build`, `npm run lint` and `npm test` are fine to run for verification.

## Tests

`npm test` (single run), `npm run test:watch`, `npm run test:coverage`.

- Vitest is configured inside `vite.config.ts` (`jsdom` environment, setup file
  `src/test/setup.ts`).
- Tests sit next to the code they cover, as `<Name>.test.ts(x)`.
- `src/test/setup.ts` stubs `matchMedia`, clears `localStorage` and the theme
  attribute before each test; `src/test/utils.tsx` holds `renderWithRouter`
  (a memory data router, matching the app's `createBrowserRouter`), `deferred`
  for pending-state assertions and `stubMatchMedia`.
- Component tests mock `src/api/*`, never axios — except the `src/api` tests
  themselves.
- Test files live under `src`, so `npm run build` typechecks them too.

## Code style

For **every** `if`, `else`, `for`, `while`, `do` and `switch` statement, always
use curly braces, even when the body is a single statement. Never write a
braceless one-liner such as `if (x) return;`.

The opening brace stays on the same line as the statement (K&R style), and
`else` / `catch` / `finally` follow the closing brace on that same line.

```ts
function loadUser(id: number): User | null {
  if (id <= 0) {
    return null;
  } else {
    return findUser(id);
  }
}

for (const user of users) {
  register(user);
}

while (queue.length > 0) {
  process(queue.pop());
}
```

## Structure

- `src/components/<Name>/` — one folder per component, with its own `.css`.
  `UserList` lists users (Edit / Delete per row); `UserForm` handles both create
  (`/users/new`) and edit (`/users/:id/edit`).
- `src/routes.ts` — route table (uses `Component:` so the file stays plain TS).
- `src/api/` — every axios call lives here (`userApi.ts`, `emailApi.ts`);
  components never call axios directly.
- `src/types/user.ts` — `User`, form value/error types, field max lengths.
- `src/utils/util.ts` — shared helpers (e.g. `isValidEmail`).
- Forms use `noValidate`; validation runs on submit, marks invalid inputs with
  the `input--invalid` class (red border) and renders the message next to the
  field.

## Theming

Every colour lives as a CSS variable in `src/index.css` — dark values on
`:root` / `:root[data-theme='dark']`, light values on `:root[data-theme='light']`
(plus a `prefers-color-scheme` fallback for the first paint). Component
stylesheets must use `var(--…)` and never hardcode a hex colour. `ThemeToggle`
flips `data-theme` on `<html>` and persists the choice in `localStorage`.

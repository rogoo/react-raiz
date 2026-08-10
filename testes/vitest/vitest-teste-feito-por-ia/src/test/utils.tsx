import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

/** Anything `createMemoryRouter` accepts as a history entry. */
type Entry = string | { pathname: string; state?: unknown };

interface RenderWithRouterOptions {
  /** Route pattern the component is mounted at (e.g. `/users/:id/edit`). */
  path?: string;
  /** History the memory router starts with. Defaults to `[path]`. */
  initialEntries?: Entry[];
  /** Extra routes to register alongside the component under test. */
  extraRoutes?: RouteObject[];
}

/**
 * Renders a single component inside a memory data router — the same router
 * flavour the app uses, so `useNavigate`, `useParams` and `useLocation` behave
 * exactly as they do in production.
 *
 * The returned `router` lets a test assert where a component navigated to and
 * which state it handed over.
 */
export function renderWithRouter(
  ui: ReactElement,
  options: RenderWithRouterOptions = {},
) {
  const { path = '/', initialEntries = [path], extraRoutes = [] } = options;

  const router = createMemoryRouter(
    [
      { path, element: ui },
      ...extraRoutes,
      // Catch-all, so navigating away from the component under test never 404s.
      { path: '*', element: <p data-testid="elsewhere" /> },
    ],
    { initialEntries },
  );

  return { ...render(<RouterProvider router={router} />), router };
}

/**
 * Replaces jsdom's missing `matchMedia` with one that answers every query the
 * same way. `ThemeToggle` asks for `(prefers-color-scheme: dark)`.
 */
export function stubMatchMedia(matches: boolean) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

/** A promise plus the handles to settle it, for asserting pending UI states. */
export function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

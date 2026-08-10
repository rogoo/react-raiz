import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryRouter,
  RouterProvider,
  type LoaderFunction,
} from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RouteErrorBoundary from './RouteErrorBoundary';

/** Mounts a route whose loader throws, guarded by the boundary under test. */
function renderFailingRoute(loader: LoaderFunction) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        loader,
        element: <p>never rendered</p>,
        ErrorBoundary: RouteErrorBoundary,
      },
    ],
    { initialEntries: ['/'] },
  );

  return render(<RouterProvider router={router} />);
}

describe('RouteErrorBoundary', () => {
  beforeEach(() => {
    // React Router reports every handled route error on the console.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows status and text for a thrown Response', async () => {
    renderFailingRoute(() => {
      throw new Response('User does not exist', {
        status: 404,
        statusText: 'Not Found',
      });
    });

    expect(
      await screen.findByRole('heading', { level: 1, name: '404 Not Found' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('User does not exist');
  });

  it('serialises a non-string Response body into the detail', async () => {
    renderFailingRoute(() => {
      throw Response.json(
        { field: 'email' },
        { status: 400, statusText: 'Bad Request' },
      );
    });

    expect(
      await screen.findByRole('heading', { level: 1, name: '400 Bad Request' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('{"field":"email"}');
  });

  it('falls back to a generic title for a thrown Error', async () => {
    renderFailingRoute(() => {
      throw new Error('loader exploded');
    });

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Something went wrong',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('loader exploded');
  });

  it('stringifies a thrown value that is not an Error', async () => {
    renderFailingRoute(() => {
      throw 'just a string';
    });

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Something went wrong',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('just a string');
  });

  it('offers a way out of the broken route', async () => {
    renderFailingRoute(() => {
      throw new Error('loader exploded');
    });

    expect(
      await screen.findByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Home' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('reloads the page when retry is clicked', async () => {
    const user = userEvent.setup();
    const reload = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      reload,
    } as unknown as Location);

    renderFailingRoute(() => {
      throw new Error('loader exploded');
    });

    await user.click(await screen.findByRole('button', { name: 'Try again' }));

    expect(reload).toHaveBeenCalledOnce();
  });

  it('hides the detail in production', async () => {
    vi.stubEnv('DEV', false);

    const { container } = renderFailingRoute(() => {
      throw new Error('loader exploded');
    });

    await screen.findByRole('alert');

    expect(screen.getByRole('alert')).not.toHaveTextContent('loader exploded');
    expect(container.querySelector('.error-boundary__detail')).toBeNull();
  });
});

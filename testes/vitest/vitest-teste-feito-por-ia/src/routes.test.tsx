import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getUser, listUsers } from './api/userApi';
import { routes } from './routes';

vi.mock('./api/userApi', () => ({
  listUsers: vi.fn(),
  getUser: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

function renderApp(entry: string) {
  const router = createMemoryRouter(routes, { initialEntries: [entry] });

  return { ...render(<RouterProvider router={router} />), router };
}

beforeEach(() => {
  vi.mocked(listUsers).mockResolvedValue([]);
  vi.mocked(getUser).mockResolvedValue({
    id: 7,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
  });
});

describe('the route table', () => {
  it('nests every page under the layout and guards it with an error boundary', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/');
    expect(routes[0].ErrorBoundary).toBeDefined();
    expect(routes[0].children?.map((child) => child.path)).toEqual([
      undefined,
      'users',
      'users/new',
      'users/:id/edit',
      'email',
      '*',
    ]);
  });
});

describe('rendering each route', () => {
  it('renders Home at the index route', async () => {
    renderApp('/');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Vitest Test' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Noix. Rogoo')).toBeInTheDocument();
  });

  it('renders the user list at /users', async () => {
    renderApp('/users');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Users' }),
    ).toBeInTheDocument();
    expect(listUsers).toHaveBeenCalledOnce();
  });

  it('renders the create form at /users/new', async () => {
    renderApp('/users/new');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'New user' }),
    ).toBeInTheDocument();
    expect(getUser).not.toHaveBeenCalled();
  });

  it('renders the edit form at /users/:id/edit', async () => {
    renderApp('/users/7/edit');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Edit user #7' }),
    ).toBeInTheDocument();
    expect(getUser).toHaveBeenCalledWith(7);
  });

  it('renders the contact form at /email', async () => {
    renderApp('/email');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Fale Conosco' }),
    ).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown path', async () => {
    renderApp('/no/such/page');

    expect(
      await screen.findByRole('heading', { level: 1, name: '404' }),
    ).toBeInTheDocument();
    expect(screen.getByText('This page does not exist.')).toBeInTheDocument();
  });

  it('keeps the layout chrome on every route, including the 404', async () => {
    renderApp('/no/such/page');

    await screen.findByRole('heading', { level: 1, name: '404' });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('navigating between routes', () => {
  it('walks from home to the user list and on to the contact form', async () => {
    const user = userEvent.setup();
    const { router } = renderApp('/');

    await user.click(screen.getByRole('link', { name: 'Users' }));
    expect(router.state.location.pathname).toBe('/users');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Users' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Fale Conosco' }));
    expect(router.state.location.pathname).toBe('/email');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Fale Conosco' }),
    ).toBeInTheDocument();
  });

  it('reaches the create form from the list', async () => {
    const user = userEvent.setup();
    const { router } = renderApp('/users');

    await screen.findByRole('heading', { level: 1, name: 'Users' });
    await user.click(screen.getByRole('link', { name: 'New user' }));

    expect(router.state.location.pathname).toBe('/users/new');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'New user' }),
    ).toBeInTheDocument();
  });

  it('returns to the 404 page from its home link', async () => {
    const { router } = renderApp('/no/such/page');

    await screen.findByRole('heading', { level: 1, name: '404' });

    expect(
      screen.getByRole('link', { name: 'Back to Home' }),
    ).toHaveAttribute('href', '/');
    expect(router.state.location.pathname).toBe('/no/such/page');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Layout from './Layout';

/** Layout is a parent route, so it is mounted with real children to fill <Outlet/>. */
function renderLayout(entry = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <p>home page</p> },
          { path: 'users', element: <p>users page</p> },
          { path: 'email', element: <p>email page</p> },
        ],
      },
    ],
    { initialEntries: [entry] },
  );

  return { ...render(<RouterProvider router={router} />), router };
}

describe('Layout', () => {
  it('renders the brand, the navigation and the footer', () => {
    renderLayout();

    expect(screen.getByText('Vitest Test')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Rogoo - Vamos que vamos - Seja curioso',
    );
  });

  it('links to the three sections of the app', () => {
    renderLayout();

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute(
      'href',
      '/users',
    );
    expect(screen.getByRole('link', { name: 'Fale Conosco' })).toHaveAttribute(
      'href',
      '/email',
    );
  });

  it('renders the matched child route inside the main landmark', () => {
    renderLayout('/users');

    expect(screen.getByRole('main')).toHaveTextContent('users page');
  });

  it('marks only the current section active', () => {
    renderLayout('/email');

    expect(screen.getByRole('link', { name: 'Fale Conosco' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Users' })).not.toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active');
  });

  it('keeps the home link inactive on child routes, thanks to `end`', () => {
    renderLayout('/users');

    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Users' })).toHaveClass('active');
  });

  it('marks the home link active on the index route', () => {
    renderLayout('/');

    expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('active');
  });

  it('includes the theme toggle in the header', () => {
    renderLayout();

    expect(
      screen.getByRole('button', { name: /switch to (dark|light) theme/i }),
    ).toBeInTheDocument();
  });

  it('swaps the outlet content when a nav link is clicked', async () => {
    const user = userEvent.setup();
    const { router } = renderLayout();

    await user.click(screen.getByRole('link', { name: 'Users' }));

    expect(router.state.location.pathname).toBe('/users');
    expect(screen.getByRole('main')).toHaveTextContent('users page');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

let shouldThrow = true;

function Boom() {
  if (shouldThrow) {
    throw new Error('render exploded');
  }

  return <p>Everything is fine</p>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true;
    // React logs every caught render error; keep the test output readable.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders its children while nothing throws', () => {
    shouldThrow = false;

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('swaps in the fallback when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Everything is fine')).toBeNull();
  });

  it('logs the error it caught', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.objectContaining({ message: 'render exploded' }),
      expect.anything(),
    );
  });

  it('shows the error message while in development', () => {
    vi.stubEnv('DEV', true);

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('render exploded');
  });

  it('hides the error message in production', () => {
    vi.stubEnv('DEV', false);

    const { container } = render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).not.toHaveTextContent('render exploded');
    expect(container.querySelector('.error-boundary__detail')).toBeNull();
  });

  it('re-renders the children when the retry button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );

    shouldThrow = false;
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

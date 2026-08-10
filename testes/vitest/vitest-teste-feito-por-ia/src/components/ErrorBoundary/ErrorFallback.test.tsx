import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback', () => {
  it('renders the default title and message as an alert', () => {
    render(<ErrorFallback />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred while rendering this page.'),
    ).toBeInTheDocument();
  });

  it('renders a custom title and message', () => {
    render(<ErrorFallback title="404 Not Found" message="No such route." />);

    expect(
      screen.getByRole('heading', { level: 1, name: '404 Not Found' }),
    ).toBeInTheDocument();
    expect(screen.getByText('No such route.')).toBeInTheDocument();
  });

  it('omits the detail block when no detail is given', () => {
    const { container } = render(<ErrorFallback />);

    expect(container.querySelector('.error-boundary__detail')).toBeNull();
  });

  it('shows the detail block when a detail is given', () => {
    const { container } = render(<ErrorFallback detail="stack trace here" />);

    expect(container.querySelector('.error-boundary__detail')).toHaveTextContent(
      'stack trace here',
    );
  });

  it('omits the retry button when no handler is given', () => {
    render(<ErrorFallback />);

    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
  });

  it('calls onRetry when the retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ErrorFallback onRetry={onRetry} />);
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('always offers a plain link home, so it works without a router', () => {
    render(<ErrorFallback />);

    expect(screen.getByRole('link', { name: 'Back to Home' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { stubMatchMedia } from '../../test/utils';
import ThemeToggle from './ThemeToggle';

const STORAGE_KEY = 'vitest-test-theme';

function theme() {
  return document.documentElement.dataset.theme;
}

describe('ThemeToggle', () => {
  it('starts from the theme stored in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'light');
    stubMatchMedia(true);

    render(<ThemeToggle />);

    expect(theme()).toBe('light');
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' }),
    ).toBeInTheDocument();
  });

  it('prefers a stored dark theme over the system preference', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    stubMatchMedia(false);

    render(<ThemeToggle />);

    expect(theme()).toBe('dark');
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' }),
    ).toBeInTheDocument();
  });

  it('falls back to the system preference when nothing is stored', () => {
    stubMatchMedia(true);

    render(<ThemeToggle />);

    expect(theme()).toBe('dark');
  });

  it('falls back to light when the system prefers light', () => {
    stubMatchMedia(false);

    render(<ThemeToggle />);

    expect(theme()).toBe('light');
  });

  it('ignores a stored value that is not a theme', () => {
    localStorage.setItem(STORAGE_KEY, 'chartreuse');
    stubMatchMedia(true);

    render(<ThemeToggle />);

    expect(theme()).toBe('dark');
  });

  it('writes the resolved theme back to localStorage on first render', () => {
    stubMatchMedia(true);

    render(<ThemeToggle />);

    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('flips the theme, the label and the stored value on click', async () => {
    const user = userEvent.setup();
    stubMatchMedia(false);

    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));

    expect(theme()).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }));

    expect(theme()).toBe('light');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');
  });

  it('exposes the same text as title and aria-label', () => {
    stubMatchMedia(false);

    render(<ThemeToggle />);

    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      'Switch to dark theme',
    );
  });

  it('hides its icon from assistive technology', () => {
    stubMatchMedia(false);

    const { container } = render(<ThemeToggle />);
    const icon = container.querySelector('svg');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass('theme-toggle__icon');
  });
});

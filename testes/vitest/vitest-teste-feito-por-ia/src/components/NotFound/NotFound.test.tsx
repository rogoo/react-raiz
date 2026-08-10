import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '../../test/utils';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('announces the missing page', () => {
    renderWithRouter(<NotFound />, { path: '/nope' });

    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    expect(screen.getByText('This page does not exist.')).toBeInTheDocument();
  });

  it('links back to the home page', () => {
    renderWithRouter(<NotFound />, { path: '/nope' });

    expect(screen.getByRole('link', { name: 'Back to Home' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('renders the page heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Vitest Test' }),
    ).toBeInTheDocument();
  });

  it('renders the lead paragraph and the body copy', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('.home__lead')).toHaveTextContent(
      /Vitest is the testing framework/,
    );
    expect(container.querySelectorAll('.home__text')).toHaveLength(3);
  });

  it('renders the signature', () => {
    render(<Home />);

    expect(screen.getByText('Noix. Rogoo')).toBeInTheDocument();
  });
});

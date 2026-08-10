import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders a contentinfo landmark with the tagline', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveTextContent('Rogoo - Vamos que vamos - Seja curioso');
    expect(footer).toHaveClass('footer');
  });
});

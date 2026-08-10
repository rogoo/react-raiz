import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import Icon from './Icon';

describe('Icon', () => {
  it('draws a 24x24 stroke frame by default', () => {
    const { container } = render(
      <Icon>
        <path d="M0 0h1" />
      </Icon>,
    );
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('honours a custom size without changing the viewBox', () => {
    const { container } = render(
      <Icon size={16}>
        <path d="M0 0h1" />
      </Icon>,
    );
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders its children inside the frame', () => {
    const { container } = render(
      <Icon>
        <circle cx="1" cy="1" r="1" />
      </Icon>,
    );

    expect(container.querySelector('svg > circle')).toBeInTheDocument();
  });
});

describe('EditIcon', () => {
  it('draws the pencil paths at the default size', () => {
    const { container } = render(<EditIcon />);

    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('passes its size down to the frame', () => {
    const { container } = render(<EditIcon size={18} />);

    expect(container.querySelector('svg')).toHaveAttribute('width', '18');
  });
});

describe('DeleteIcon', () => {
  it('draws the bin paths at the default size', () => {
    const { container } = render(<DeleteIcon />);

    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelectorAll('path')).toHaveLength(4);
  });

  it('passes its size down to the frame', () => {
    const { container } = render(<DeleteIcon size={18} />);

    expect(container.querySelector('svg')).toHaveAttribute('width', '18');
  });
});

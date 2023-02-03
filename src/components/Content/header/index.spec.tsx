import { render, screen } from '@testing-library/react';
import { ContentHeader } from '.';

describe('ContentHeader', () => {
  it('should have a title name `ContentHeader Test Title`', () => {
    render(<ContentHeader text="ContentHeader Test Title" />);

    const header = screen.getByText(/ContentHeader Test Title/i);
    expect(header).toBeInTheDocument();
  });

  it('should have a button name `ContentHeader Test Button`', () => {
    render(<ContentHeader text="ContentHeader Test Title" button={<button>ContentHeader Test Button</button>} />);

    const button = screen.getByRole('button', { name: /ContentHeader Test Button/ });
    expect(button).toBeInTheDocument();
  });
});

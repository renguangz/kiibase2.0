import { render, screen } from '@testing-library/react';
import { withFilterField } from '.';

describe('withFilterField', () => {
  it('should render with label and input with test-id = `searchInput`', () => {
    render(withFilterField('Input')('searchInput')('test input')({}));

    const label = screen.getByText(/test input/);
    expect(label).toBeInTheDocument();

    const searchInput = screen.getByTestId('searchInput');
    expect(searchInput).toBeInTheDocument();
  });
});

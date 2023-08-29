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

  it('should render input without label=`test label` and test-id=`test id`', () => {
    render(withFilterField('Input')()()({}));

    const label = screen.queryByText(/test label/);
    expect(label).not.toBeInTheDocument();

    const testId = screen.queryByTestId(/test id/);
    expect(testId).not.toBeInTheDocument();
  });
});

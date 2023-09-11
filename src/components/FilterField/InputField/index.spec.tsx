import { fireEvent, render, screen } from '@testing-library/react';
import filtersData from '@/src/mocks/db/filters.json';
import { InputField } from '.';
import { fetchMockData } from '@/src/mocks/db/utils/fetchMockData';
import { InputProps } from 'antd';

describe('InputField', () => {
  const inputProps = fetchMockData(filtersData).searchInputs[0] as InputProps;
  beforeEach(() => render(<InputField label="test input" inputProps={inputProps} />));

  it('should have label `test input`', () => {
    const label = screen.getByText(/test input/);

    expect(label).toBeInTheDocument();
  });

  describe('SearchInput', () => {
    it('should clear the value after clicking clear icon', () => {
      const searchInput = screen.getByTestId('searchInput');
      fireEvent.change(searchInput, { target: { value: 'test input value' } });
      const clearButton = screen.getByRole('button');
      fireEvent.click(clearButton);

      expect(searchInput).toHaveValue('');
    });
  });
});

import { act, fireEvent, render, screen } from '@testing-library/react';
import { FilterField, FilterFieldProps } from '.';

describe('FilterField', () => {
  const setup = ({ onSubmit }: FilterFieldProps) => {
    render(<FilterField onSubmit={onSubmit} />);
    const submitButton = screen.getByRole('button', { name: /送出/ });
    return {
      submitButton,
    };
  };

  it('should call the submit function', async () => {
    const mockOnSubmit = jest.fn();
    const { submitButton } = setup({ onSubmit: mockOnSubmit });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertModal } from '.';

describe('AlertModal', () => {
  const mockSetModalDisplay = jest.fn();
  const mockConfirmFunction = jest.fn();
  beforeEach(() => render(<AlertModal setModalDisplay={mockSetModalDisplay} confirmFunction={mockConfirmFunction} />));

  afterEach(() => jest.resetAllMocks());
  it('should have confirm button and cancel button', async () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should set display to false after clicking cancel button', async () => {
    const cancelButton = screen.getByRole('button', { name: '取消' });
    await userEvent.click(cancelButton);
    expect(mockSetModalDisplay).toHaveBeenCalledWith(false);
  });

  it('should call delete function and close the modal after clicking confirm modal', async () => {
    const confirmButton = screen.getByRole('button', { name: /確認/i });
    await userEvent.click(confirmButton);
    expect(mockSetModalDisplay).toHaveBeenCalledWith(false);
    expect(mockConfirmFunction).toHaveBeenCalled();
  });
});

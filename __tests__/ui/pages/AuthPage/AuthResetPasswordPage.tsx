import ResetPasswordPage from '/pages/auth/reset-password';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as requestUtils from '@/utils/request';

jest.mock('@/utils/request', () => ({
  ...jest.requireActual('@/utils/request'),
  request: jest.fn(),
}));

const mock_oldpassword = 'oldpassword';
const mock_newpassword = 'newpassword';

describe('AuthResetPasswordPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const setup = () => {
    render(<ResetPasswordPage />);
    const oldPasswordInput = screen.getByTestId('oldPassword');
    const newpasswordInput = screen.getByTestId('newPassword');
    const newConfirmPasswordInput = screen.getByTestId('newConfirmPassword');
    const confirmButton = screen.getByRole('button', { name: /確認/ });
    return { oldPasswordInput, newpasswordInput, newConfirmPasswordInput, confirmButton };
  };

  it('should have disabled confirmButton', async () => {
    const { confirmButton } = setup();
    expect(confirmButton).toBeDisabled();
  });

  it('should show error hint when confirm password and password are not the same', async () => {
    const { oldPasswordInput, newpasswordInput, newConfirmPasswordInput, confirmButton } = setup();
    await userEvent.type(oldPasswordInput, mock_oldpassword);
    await userEvent.type(newpasswordInput, mock_newpassword);
    await userEvent.type(newConfirmPasswordInput, mock_newpassword + 123);
    await userEvent.click(confirmButton);
    expect(requestUtils.request).not.toHaveBeenCalled();
    expect(confirmButton).toBeDisabled();
  });

  it('should call `resetPassword` api after clicking confirm button', async () => {
    const { oldPasswordInput, newpasswordInput, newConfirmPasswordInput, confirmButton } = setup();
    await userEvent.type(oldPasswordInput, mock_oldpassword);
    await userEvent.type(newpasswordInput, mock_newpassword);
    await userEvent.type(newConfirmPasswordInput, mock_newpassword);
    await userEvent.click(confirmButton);
    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    const expectPayload = {
      method: 'POST',
      body: JSON.stringify({
        old_password: mock_oldpassword,
        new_password: mock_newpassword,
        new_password_confirmation: mock_newpassword,
      }),
    };
    expect(requestUtils.request).toHaveBeenCalledWith('/resetPassword', expectPayload);
  });
});

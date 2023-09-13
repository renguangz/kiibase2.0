import SignupPage from '/pages/auth/signup';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as requestUtils from '@/utils/request';

jest.mock('@/utils/request', () => ({
  ...jest.requireActual('@/utils/request'),
  request: jest.fn(),
}));

const mock_account = 'testaccount';
const mock_password = 'testpassword';

describe('AuthSignupPage', () => {
  const setup = () => {
    render(<SignupPage />);

    const accountInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');
    const confirmButton = screen.getByRole('button', { name: /確定/ });
    const loginButton = screen.getByRole('link', { name: /登入/ });
    return { accountInput, passwordInput, confirmPassword, confirmButton, loginButton };
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have disabled confirmButton', async () => {
    const { confirmButton } = setup();
    expect(confirmButton).toBeDisabled();
  });

  it('should show error hint when confirm password and password is not the same', async () => {
    const { accountInput, passwordInput, confirmPassword, confirmButton } = setup();
    await userEvent.type(accountInput, mock_account);
    await userEvent.type(passwordInput, mock_password);
    await userEvent.type(confirmPassword, mock_password + '123');
    expect(confirmButton).toBeEnabled();
    await userEvent.click(confirmButton);

    expect(requestUtils.request).not.toHaveBeenCalled();
    expect(confirmButton).toBeDisabled();
  });

  it('should call `signUp` api', async () => {
    const { accountInput, passwordInput, confirmPassword, confirmButton } = setup();

    await userEvent.type(accountInput, mock_account);
    await userEvent.type(passwordInput, mock_password);
    await userEvent.type(confirmPassword, mock_password);
    expect(confirmButton).toBeEnabled();
    await userEvent.click(confirmButton);
    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    const expectPayload = {
      method: 'POST',
      body: JSON.stringify({ account: mock_account, password: mock_password, password_confirmation: mock_password }),
    };
    expect(requestUtils.request).toHaveBeenCalledWith('/signUp', expectPayload);
  });
});

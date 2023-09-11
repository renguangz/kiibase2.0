import AuthLoginPage from '@/pages/auth/login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessLogin from '@/src/mocks/db/utils/auth/successLogin.json';
import FailLogin from '@/src/mocks/db/utils/auth/failLogin.json';
import * as requestUtils from '@/src/utils/request';

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('AuthLoginPage', () => {
  const setup = () => {
    render(<AuthLoginPage />);
    const inputs = screen.getAllByRole('textbox');
    const accountInput = inputs[0];
    const passwordInput = screen.getByTestId('authPassword');
    const loginButton = screen.getByRole('button', { name: '登入' });
    return { accountInput, passwordInput, loginButton };
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call `/login` api with account and password', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue(SuccessLogin);

    const { accountInput, passwordInput, loginButton } = setup();
    await userEvent.type(accountInput, 'testaccount');
    await userEvent.type(passwordInput, 'testpassword');
    await userEvent.click(loginButton);
    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    const expectBody = {
      method: 'POST',
      body: JSON.stringify({ account: 'testaccount', password: 'testpassword' }),
    };
    expect(requestUtils.request).toHaveBeenCalledWith(`/login`, expectBody);
  });

  it('should call router push after successfully login', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue(SuccessLogin);

    const { accountInput, passwordInput, loginButton } = setup();
    await userEvent.type(accountInput, 'testaccount');
    await userEvent.type(passwordInput, 'testpassword');
    await userEvent.click(loginButton);
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/adminUser');
  });

  it('should not call router push when login fail', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue(FailLogin);

    const { accountInput, passwordInput, loginButton } = setup();
    await userEvent.type(accountInput, 'testaccount');
    await userEvent.type(passwordInput, 'testpassword');
    await userEvent.click(loginButton);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});

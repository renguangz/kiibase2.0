import { act, fireEvent, render, screen } from '@testing-library/react';
import { Loginform } from '.';
import authAccounts from '@/src/mock/db/utils/auth/accounts.json';
import successfullLogin from '@/src/mock/db/utils/auth/successLogin.json';
import failLogin from '@/src/mock/db/utils/auth/failLogin.json';
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

const ACCOUNTS = authAccounts.data;

describe('LoginForm', () => {
  const setup = () => {
    const utils = render(<Loginform />);
    const account = screen.getByTestId('authAccount') as HTMLInputElement;
    const password = screen.getByTestId('authPassword') as HTMLInputElement;
    const submitButton = screen.getByTestId('authLogin') as HTMLButtonElement;
    return { account, password, submitButton, ...utils };
  };

  it('should have disabled submit button if account or password is empty', () => {
    const { account, password, submitButton } = setup();

    expect(submitButton.disabled).toBeTruthy();

    fireEvent.change(account, { target: { value: ACCOUNTS[0].account } });
    fireEvent.change(password, { target: { value: ACCOUNTS[0].password } });

    expect(submitButton.disabled).not.toBeTruthy();
  });

  it('should route to home page after successfully login', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue({ ...successfullLogin });

    const { account, password, submitButton } = setup();

    fireEvent.change(account, { target: { value: ACCOUNTS[0].account } });
    fireEvent.change(password, { target: { value: ACCOUNTS[0].password } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    act(() => {
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/adminUser');
      expect(account.value).toBe('');
      expect(password.value).toBe('');
    });
  });

  it('should not clean up account if failed login', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue({ ...failLogin });

    const { account, password, submitButton } = setup();

    fireEvent.change(account, { target: { value: 'unregistereduser' } });
    fireEvent.change(password, { target: { value: 'unregistereduser' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    act(() => {
      expect(account.value).toBe('unregistereduser');
      expect(password.value).toBe('');
    });
  });

  it('should disable submitButton after failing login', async () => {
    const { account, password, submitButton } = setup();

    fireEvent.change(account, { target: { value: 'unregistereduser' } });
    fireEvent.change(password, { target: { value: 'unregistereduser' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(submitButton.disabled).toBeTruthy();
  });
});

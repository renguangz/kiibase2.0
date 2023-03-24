import { act, renderHook } from '@testing-library/react-hooks';
import { useLogin } from '.';
import authAccounts from '@/src/mock/db/utils/auth/accounts.json';
import successfullLogin from '@/src/mock/db/utils/auth/successLogin.json';
import failLogin from '@/src/mock/db/utils/auth/failLogin.json';

const ACCOUNTS = authAccounts.data;

describe('useLogin', () => {
  it('should successfull login then clear account and password', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(successfullLogin),
      }),
    );

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setAccount(ACCOUNTS[0].account);
      result.current.setPassword(ACCOUNTS[0].password);
    });

    await act(async () => {
      expect(result.current.account).toEqual(ACCOUNTS[0].account);
      await result.current.handleLogin();
    });

    expect(fetch).toHaveBeenCalled();

    act(() => {
      expect(result.current.data?.status).toEqual(200);
      expect(result.current.data?.message).toEqual('success');
      expect(result.current.account).toEqual('');
      expect(result.current.password).toEqual('');
    });
  });

  it('should fail login and do not clear account and password', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(failLogin),
      }),
    );

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setAccount('notregistereduser');
      result.current.setPassword('notregistereduser');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(fetch).toHaveBeenCalled();

    act(() => {
      expect(result.current.data?.status).toEqual(400);
      expect(result.current.data?.message).toEqual('DATA_ERROR');
    });
  });
});

import { act, renderHook } from '@testing-library/react-hooks';
import { useLogin } from '.';
import authAccounts from '@/src/mock/db/utils/auth/accounts.json';
import successfullLogin from '@/src/mock/db/utils/auth/successLogin.json';
import failLogin from '@/src/mock/db/utils/auth/failLogin.json';
import * as requestUtils from '@/src/utils/request';

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));

const mockSWRMutate = jest.fn();

jest.mock('swr', () => ({
  useSWRConfig: () => ({
    mutate: mockSWRMutate,
  }),
}));

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const ACCOUNTS = authAccounts.data;

describe('useLogin', () => {
  afterEach(() => jest.resetAllMocks());

  it('should successfull login then clear account and password and router push to home page', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue({
      ...successfullLogin,
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setAccount(ACCOUNTS[0].account);
      result.current.setPassword(ACCOUNTS[0].password);
    });

    await act(async () => {
      expect(result.current.account).toEqual(ACCOUNTS[0].account);
      await result.current.handleLogin();
    });

    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    const body = JSON.stringify({
      account: ACCOUNTS[0].account,
      password: ACCOUNTS[0].password,
    });
    expect(requestUtils.request).toHaveBeenCalledWith('/login', { method: 'POST', body });

    act(() => {
      expect(result.current.data?.status).toEqual(200);
      expect(result.current.data?.message).toEqual('success');
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/');
      expect(result.current.account).toEqual('');
      expect(result.current.password).toEqual('');
    });
  });

  it('should call mutate for sidebar api after successfull login', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue({
      ...successfullLogin,
    });

    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.setAccount(ACCOUNTS[0].account);
      result.current.setPassword(ACCOUNTS[0].password);
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockSWRMutate).toHaveBeenCalledTimes(2);
  });

  it('should fail login and do not clear account and password', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue({ ...failLogin });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setAccount('notregistereduser');
      result.current.setPassword('notregistereduser');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    const body = JSON.stringify({
      account: 'notregistereduser',
      password: 'notregistereduser',
    });
    expect(requestUtils.request).toHaveBeenCalledWith('/login', { method: 'POST', body });

    act(() => {
      expect(result.current.data?.status).toEqual(failLogin.status);
      expect(result.current.data?.message).toEqual(failLogin.message);
    });
  });
});

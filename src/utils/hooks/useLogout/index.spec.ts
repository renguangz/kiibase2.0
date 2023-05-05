import { renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useLogout } from '.';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useLogout', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    Cookies.set('token', 'logintoken', { expires: 7 });
    Cookies.set('others', 'othercookies', { expires: 7 });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    mockPush.mockReset();
    Cookies.remove('token');
    Cookies.remove('others');
  });

  it('should remove `token` in cookies after trigger handleLogout', async () => {
    const { result } = renderHook(() => useLogout());
    expect(result.current).toHaveProperty('handleLogout');
    result.current.handleLogout();
    expect(document.cookie).not.toMatch('token=logintoken');
    expect(document.cookie).toMatch('others=othercookies');
  });

  it('should trigger router push', async () => {
    const { result } = renderHook(() => useLogout());
    result.current.handleLogout();
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });
});

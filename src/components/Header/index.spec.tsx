import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import { HeaderComponent } from '.';

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('Header component', () => {
  beforeEach(() => {
    Cookies.set('token', 'logintoken');
    Cookies.set('others', 'othercookies');
    render(<HeaderComponent />);
  });

  afterEach(() => {
    Cookies.remove('token');
    Cookies.remove('others');
  });

  describe('auth', () => {
    it('should popup list with change password and logout', async () => {
      const authButton = screen.queryByTitle('auth') as HTMLButtonElement;
      expect(authButton).toBeVisible();
      expect(screen.queryByRole('button', { name: '登出' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '修改密碼' })).not.toBeInTheDocument();

      await userEvent.click(authButton);
      const logoutButton = screen.queryByRole('button', { name: '登出' });
      const changePasswordButton = screen.queryByRole('button', { name: '修改密碼' });

      expect(logoutButton).toBeVisible();
      expect(logoutButton).toBeInTheDocument();
      expect(changePasswordButton).toBeVisible();
      expect(changePasswordButton).toBeInTheDocument();
    });

    it('should close list after clicking again', async () => {
      const authButton = screen.queryByTitle('auth') as HTMLButtonElement;
      await userEvent.click(authButton);
      await userEvent.click(authButton);

      const logoutButton = screen.queryByRole('button', { name: '登出' });
      const changePasswordButton = screen.queryByRole('button', { name: '修改密碼' });
      expect(logoutButton).not.toBeInTheDocument();
      expect(changePasswordButton).not.toBeInTheDocument();
    });

    it('should logout after clicking `登出` and close the list and route to login page', async () => {
      const authButton = screen.queryByTitle('auth') as HTMLButtonElement;
      await userEvent.click(authButton);

      const logoutButton = screen.queryByRole('button', { name: '登出' }) as HTMLButtonElement;
      await userEvent.click(logoutButton);

      expect(logoutButton).not.toBeInTheDocument();
      expect(document.cookie).not.toMatch('token=logintoken');
      expect(document.cookie).toMatch('others=othercookies');
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/auth/login');
    });
  });
});

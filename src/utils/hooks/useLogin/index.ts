import { useCallback, useMemo, useState } from 'react';
import { GenericDataType } from '../../types';
import Cookies from 'js-cookie';
import { request, requestOptionsTemplate } from '../../request';

type UserType = {
  id: number;
  account: string;
  remember_token: null;
  status: number;
  last_login_at: string;
  created_at: string;
  updated_at: string;
};

type ResponseDataType = {
  token: string;
  default: Array<string>;
  user: UserType;
};

export function useLogin() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<GenericDataType<ResponseDataType | null> | null>(null);

  const loginDisabled = useMemo(() => account.trim() === '' || password.trim() === '', [account, password]);

  const hasLoginTokenInCookie = Cookies.get('token') !== undefined;

  const handleLogin = useCallback(async () => {
    const result = await request('/login', requestOptionsTemplate('POST', { account, password }));
    setData(result);

    if (result.status === 200) {
      const token = result.data.token;
      Cookies.set('token', token, { expires: 7 });
      setAccount('');
    }

    setPassword('');
  }, [account, password]);

  return {
    hasLoginTokenInCookie,
    account,
    setAccount,
    password,
    setPassword,
    handleLogin,
    data,
    loginDisabled,
  };
}

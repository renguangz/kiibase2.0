import { useCallback, useMemo, useState } from 'react';
import { fetchPostData } from '../../fetch';
import { GenericDataType } from '../../types';
import Cookies from 'js-cookie';
import { environments } from '../../environments';

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

export const url = 'https://base.jenyen-uat.kiitzu.ninja/api/login';
// export const url = `${environments.DOCKER_HOST}/login`;

export function useLogin() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<GenericDataType<ResponseDataType | null> | null>(null);

  const loginDisabled = useMemo(() => account.trim() === '' || password.trim() === '', [account, password]);

  const hasLoginTokenInCookie = Cookies.get('token') !== undefined;

  const handleLogin = useCallback(async () => {
    const result = await fetchPostData(url, { account, password });
    setData(result);

    if (result.status === 200) {
      const token = result.data.token;
      Cookies.set('token', token, { expires: 7 });
      setAccount('');
    }

    setPassword('');
  }, [account, password, fetchPostData]);

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

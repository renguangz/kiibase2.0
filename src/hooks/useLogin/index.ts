import { useCallback, useMemo, useState } from 'react';
import { GenericDataType } from '@/utils/types';
import Cookies from 'js-cookie';
import { request, requestOptionsTemplate } from '@/utils/request';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { ResponseMessageType } from '../useCreateContent';

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
  const router = useRouter();
  const { push } = router;

  const { mutate } = useSWRConfig();

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<GenericDataType<ResponseDataType | null> | null>(null);
  const [loginResponseMessage, setLoginResponseMessage] = useState<ResponseMessageType>(null);

  const loginDisabled = useMemo(() => account.trim() === '' || password.trim() === '', [account, password]);

  const hasLoginTokenInCookie = Cookies.get('token') !== undefined;

  const handleLogin = useCallback(async () => {
    const result = await request('/login', requestOptionsTemplate('POST', { account, password }));
    setData(result);

    if (result.status === 200) {
      setLoginResponseMessage({ type: 'success', message: '登入成功' });
      const token = result.data.token;
      Cookies.set('token', token, { expires: 7 });
      push('/demo');
      setAccount('');
      mutate('/menuItemNavi');
      mutate('/subMenuNavi');
    } else {
      setLoginResponseMessage({ type: 'error', message: result?.message ?? '' });
    }
    setPassword('');
  }, [account, password, push]);

  return {
    hasLoginTokenInCookie,
    account,
    setAccount,
    password,
    setPassword,
    handleLogin,
    data,
    loginDisabled,
    loginResponseMessage,
  };
}

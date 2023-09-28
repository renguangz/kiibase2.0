import { useCallback, useMemo, useRef, useState } from 'react';
import { GenericDataType } from '@/utils/types';
import Cookies from 'js-cookie';
import { request, requestOptionsTemplate } from '@/utils/request';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { Toast } from 'primereact/toast';
import { useCommon } from '../useCommon';

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
  const toast = useRef<Toast>(null);

  const { showSuccess, showError } = useCommon();

  const { mutate } = useSWRConfig();

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<GenericDataType<ResponseDataType | null> | null>(null);

  const loginDisabled = useMemo(() => account.trim() === '' || password.trim() === '', [account, password]);

  const hasLoginTokenInCookie = Cookies.get('token') !== undefined;

  const handleLogin = useCallback(async () => {
    try {
      const result = await request('/login', requestOptionsTemplate('POST', { account, password }));
      setData(result);
      showSuccess(toast, { detail: '登入成功' });
      const token = result.data.token;
      Cookies.set('token', token, { expires: 7 });
      push('/demo');
      setAccount('');
      mutate('/menuItemNavi');
      mutate('/subMenuNavi');
    } catch (error) {
      const detail = error instanceof Error ? JSON.parse(error.message).message : '登入失敗，請再試一次';
      showError(toast, { detail });
    }
    setPassword('');
  }, [account, password, push]);

  return {
    toast,
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

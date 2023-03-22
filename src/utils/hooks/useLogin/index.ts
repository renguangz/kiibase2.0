import { useCallback, useState } from 'react';
import { fetchPostData } from '../../fetch';
import { GenericDataType } from '../../types';

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

const url = 'https://base.jenyen-uat.kiitzu.ninja/api/login';

export function useLogin() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<GenericDataType<ResponseDataType | null> | null>(null);

  const handleLogin = useCallback(async () => {
    const result = await fetchPostData(url, { account, password });
    setData(result);

    if (result.status === 200) {
      setAccount('');
      setPassword('');
    }
  }, [account, password, fetchPostData]);

  return {
    account,
    setAccount,
    password,
    setPassword,
    handleLogin,
    data,
  };
}
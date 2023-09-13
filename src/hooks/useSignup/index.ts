import { useCallback, useMemo, useState } from 'react';
import { hasEmptyString } from '@/utils/functions';
import { request, requestOptionsTemplate } from '@/utils/request';

export function useSignup() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const disabledConfirmButton = useMemo(
    () => hasEmptyString([account, password, confirmPassword]),
    [hasEmptyString, account, password, confirmPassword],
  );

  const handleSignup = useCallback(async () => {
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      return;
    }
    await request(
      '/signUp',
      requestOptionsTemplate('POST', { account, password, password_confirmation: confirmPassword }),
    );
  }, [request, requestOptionsTemplate, account, password, confirmPassword]);

  return {
    account,
    setAccount,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    disabledConfirmButton,
    handleSignup,
  };
}

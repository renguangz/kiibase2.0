import { useCallback, useMemo, useState } from 'react';
import { hasEmptyString } from '../../functions';
import { request, requestOptionsTemplate } from '../../request';

export function useResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  const disabledComfirmButton = useMemo(
    () => hasEmptyString([oldPassword, newPassword, newConfirmPassword]),
    [hasEmptyString, oldPassword, newPassword, newConfirmPassword],
  );

  const handleReset = useCallback(async () => {
    if (newPassword !== newConfirmPassword) {
      setNewPassword('');
      setNewConfirmPassword('');
      return;
    }
    await request(
      '/resetPassword',
      requestOptionsTemplate('POST', {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: newConfirmPassword,
      }),
    );
  }, [
    newPassword,
    newConfirmPassword,
    setNewPassword,
    setNewConfirmPassword,
    request,
    requestOptionsTemplate,
    oldPassword,
  ]);

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    newConfirmPassword,
    setNewConfirmPassword,
    disabledComfirmButton,
    handleReset,
  };
}

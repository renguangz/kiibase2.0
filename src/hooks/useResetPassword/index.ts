import { useCallback, useMemo, useRef, useState } from 'react';
import { hasEmptyString } from '@/utils/functions';
import { request, requestOptionsTemplate } from '@/utils/request';
import { useCommon } from '../useCommon';
import { Toast } from 'primereact/toast';

export function useResetPassword() {
  const { showSuccess, showError } = useCommon();

  const toast = useRef<Toast>(null);

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
      showError({ detail: '密碼不相符' }, toast);
      return;
    }

    try {
      await request(
        '/resetPassword',
        requestOptionsTemplate('POST', {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: newConfirmPassword,
        }),
      );
      showSuccess({ detail: '成功重設密碼' }, toast);
    } catch (error) {
      const detail = error instanceof Error ? JSON.parse(error.message) : '失敗，請再試一次';
      showError({ detail }, toast);
    }
    setNewPassword('');
    setNewConfirmPassword('');
    setOldPassword('');
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
    toast,
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

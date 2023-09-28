import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

type ToastRefType = RefObject<Toast>;

export enum ESeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
}

type ToastShowOption = {
  summary?: string;
  detail: string;
  life?: number;
};

export function useCommon() {
  const showSuccess = (toast: ToastRefType, options: ToastShowOption): void => {
    toast.current?.show({ summary: '成功', life: 3000, ...options, severity: 'success' });
  };

  const showError = (toast: ToastRefType, options: ToastShowOption): void => {
    toast.current?.show({ summary: '錯誤', life: 3000, ...options, severity: 'error' });
  };

  return {
    showSuccess,
    showError,
  };
}

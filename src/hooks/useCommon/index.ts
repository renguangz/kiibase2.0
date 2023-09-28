import { Toast } from 'primereact/toast';
import { RefObject, useRef } from 'react';

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
  const layoutToast = useRef<Toast>(null);

  const showHint =
    (initSummary: string, severity: ESeverity) =>
    (options: ToastShowOption, customToast?: ToastRefType): void => {
      const { summary, detail, life } = options;
      const show = (ref: ToastRefType) =>
        ref.current?.show({ severity, summary: summary ?? initSummary, detail, life });
      customToast ? show(customToast) : show(layoutToast);
    };

  const showSuccess = showHint('成功', ESeverity.SUCCESS);
  const showError = showHint('失敗', ESeverity.ERROR);

  return {
    layoutToast,
    showSuccess,
    showError,
  };
}

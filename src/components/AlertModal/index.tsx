import { Dispatch, SetStateAction, useCallback } from 'react';

interface AlertModalProps {
  setModalDisplay: Dispatch<SetStateAction<boolean>>;
  confirmFunction: () => void;
}

export function AlertModal({ setModalDisplay, confirmFunction }: AlertModalProps) {
  const handleConfirm = useCallback(() => {
    confirmFunction();
    setModalDisplay(false);
  }, [setModalDisplay, confirmFunction]);

  return (
    <div role="alert">
      <h2>Alert modal</h2>
      <button type="button" onClick={() => setModalDisplay(false)}>
        取消
      </button>
      <button type="button" onClick={handleConfirm}>
        確認刪除
      </button>
    </div>
  );
}

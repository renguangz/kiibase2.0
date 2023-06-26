import { useResetPassword } from '@/src/utils/hooks';

export default function ResetPasswordPage() {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    newConfirmPassword,
    setNewConfirmPassword,
    disabledComfirmButton,
    handleReset,
  } = useResetPassword();

  return (
    <div>
      <div>reset</div>
      <div>
        <span>舊密碼</span>
        <input
          data-testid="oldPassword"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <span>新密碼</span>
        <input
          data-testid="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <span>確認新密碼</span>
        <input
          data-testid="newConfirmPassword"
          type="password"
          value={newConfirmPassword}
          onChange={(e) => setNewConfirmPassword(e.target.value)}
        />
      </div>
      <button type="button" disabled={disabledComfirmButton} onClick={handleReset}>
        確認
      </button>
    </div>
  );
}

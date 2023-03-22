import { useLogin } from '@/src/utils/hooks';

export function Loginform() {
  const { account, setAccount, password, setPassword, handleLogin, loginDisabled } = useLogin();

  return (
    <div>
      <div>LoginForm</div>
      <div>
        <span>Username</span>
        <input data-testid="authAccount" value={account} onChange={(e) => setAccount(e.target.value)} />
        <span>password</span>
        <input data-testid="authPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button data-testid="authLogin" type="button" onClick={handleLogin} disabled={loginDisabled}>
          登入
        </button>
      </div>
    </div>
  );
}

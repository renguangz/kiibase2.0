import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '/pages/_app';
import AuthLayout from '@/layouts/AuthLayout';
import { useSignup } from '@/hooks';
import Link from 'next/link';

const SignupPage: NextPageWithLayout = () => {
  const {
    account,
    setAccount,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    disabledConfirmButton,
    handleSignup,
  } = useSignup();

  return (
    <div>
      <div>
        <span>帳號</span>
        <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
      </div>
      <div>
        <span>密碼</span>
        <input data-testid="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <span>確認密碼</span>
        <input
          data-testid="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="button" disabled={disabledConfirmButton} onClick={handleSignup}>
        確定
      </button>
      <Link href={'/auth/login'}>前往登入頁</Link>
    </div>
  );
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;

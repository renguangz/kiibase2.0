import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '/pages/_app';
import { Loginform } from '@/components/LoginForm';
import { LogoImg, Wrapper } from '@/layouts/layout/AppTopbar';
import Logo from '/public/Logo.svg';
import { AuthLayout } from '@/layouts/AuthLayout';

const AuthLoginPage: NextPageWithLayout = () => {
  return (
    <div>
      <Wrapper className="layout-topbar">
        <LogoImg src={Logo.src} alt="logo" />
      </Wrapper>
      <Loginform />
    </div>
  );
};

AuthLoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthLoginPage;

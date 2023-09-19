import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '/pages/_app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loginform } from '@/components/LoginForm';
import { LogoImg, Wrapper } from '@/layouts/layout/AppTopbar';
import Logo from '/public/Logo.svg';
import AuthLayout from '@/layouts/AuthLayout';
import { useAuthConfig } from '/src/contexts/auth';
import Loading from '/src/components/Loading';

const AuthLoginPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { handlePermissionUpdate } = useAuthConfig();

  useEffect(() => {
    handlePermissionUpdate().then((response) => {
      if (response.ok) {
        window.history.length > 2 ? router.back() : router.push('/adminUser');
      } else {
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

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

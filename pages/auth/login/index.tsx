import { Loginform } from '@/src/components/LoginForm';
import { LogoImg, Wrapper } from '@/src/layouts/layout/AppTopbar';
import Logo from '@/public/Logo.svg';

export default function AuthLoginPage() {
  return (
    <div>
      <Wrapper className="layout-topbar">
        <LogoImg src={Logo.src} alt="logo" />
      </Wrapper>
      <Loginform />
    </div>
  );
}

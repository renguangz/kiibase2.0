import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface AuthLayoutProps {
  children: JSX.Element;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}

import { HeaderComponent, SidebarComponent } from '@/components';
import styled from 'styled-components';

interface DefaultLayoutProps {
  children: JSX.Element;
}

const Wrapper = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
`;

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Wrapper>
      <HeaderComponent />
      <BodyWrapper>
        <SidebarComponent />
        <div>{children}</div>
      </BodyWrapper>
    </Wrapper>
  );
}

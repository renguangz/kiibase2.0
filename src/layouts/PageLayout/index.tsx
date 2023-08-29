import { Wrapper } from '@/src/components/common';
import styled from 'styled-components';

const PageLayoutWrapper = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  flex-direction: column;
  justify-content: flex-start;
`;

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return <PageLayoutWrapper>{children}</PageLayoutWrapper>;
}

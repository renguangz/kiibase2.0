import { Wrapper } from '@/src/components/common';
import { SPACES } from '@/src/utils';
import React from 'react';
import styled from 'styled-components';

const PageLayoutWrapper = styled(Wrapper)`
  padding: ${SPACES['space-50']}px;
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

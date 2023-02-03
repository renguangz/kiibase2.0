import { Layout } from 'antd';
import { HeaderComponent, SidebarComponent } from '@/src/components';

interface DefaultLayoutProps {
  children: JSX.Element;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const { Content } = Layout;

  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <SidebarComponent />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

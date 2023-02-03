import { useSidebar } from '@/src/utils/hooks';
import { Layout, Menu } from 'antd';

export function SidebarComponent() {
  const { Sider } = Layout;

  const { data: sidebarResponseData } = useSidebar();

  return (
    <Sider theme="light">
      <Menu items={sidebarResponseData} mode="inline" />
    </Sider>
  );
}

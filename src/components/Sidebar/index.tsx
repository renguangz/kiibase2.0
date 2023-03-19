import { useSidebar } from '@/src/utils/hooks';
import { Layout, Menu } from 'antd';

export function SidebarComponent() {
  const { Sider } = Layout;

  const { menuItems, subMenuItems } = useSidebar();

  return (
    <Sider theme="light">
      <Menu items={menuItems} mode="inline" />
      <Menu items={subMenuItems} inlineCollapsed={true} />
    </Sider>
  );
}

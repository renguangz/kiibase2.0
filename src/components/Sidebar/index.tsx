import { Layout, Menu } from 'antd';

export function SidebarComponent() {
  const { Sider } = Layout;
  return (
    <Sider theme='light'>
      <Menu />
    </Sider>
  );
}

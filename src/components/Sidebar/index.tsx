import { useSidebar } from '@/src/utils/hooks';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

export function SidebarComponent() {
  const { Sider } = Layout;

  const { SubMenu } = Menu;

  const { subMenuItems, menuItemNaviData, openKeys, setOpenKeys, onOpenChange } = useSidebar();

  return (
    <Sider theme="light">
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
        {menuItemNaviData &&
          Array.isArray(menuItemNaviData) &&
          menuItemNaviData.map((item) => (
            <Menu.Item key={item.id}>
              <Link href={`/${item.name}`}>{item.title}</Link>
            </Menu.Item>
          ))}
        {subMenuItems &&
          Array.isArray(subMenuItems) &&
          subMenuItems.map((item) => (
            <SubMenu key={item.id} title={item.title} onTitleClick={() => setOpenKeys([item.id])}>
              {item &&
                item.children &&
                Array.isArray(item.children) &&
                item.children.map((child) => (
                  <Menu.Item key={child.id}>
                    <Link href={`/${child.name}`}>{child.title}</Link>
                  </Menu.Item>
                ))}
            </SubMenu>
          ))}
      </Menu>
    </Sider>
  );
}

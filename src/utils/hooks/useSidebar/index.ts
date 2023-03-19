import { useCallback, useMemo, useState } from 'react';
import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import menuItemNavi from '@/src/mock/db/utils/sidebar/menuItemNavi.json';
import subMenuNavi from '@/src/mock/db/utils/sidebar/subMenuNavi.json';
import { ItemType } from 'antd/es/menu/hooks/useItems';

export type MenuItemsDataType = {
  id: string;
  name: string;
  title: string;
};
export type SubMenuItemsDataType = Record<string, MenuItemsDataType[]>;
export type MapMenuDataType = (data: MenuItemsDataType[]) => ItemType[];
export type MapSubMenuDataType = (
  data: Record<string, MenuItemsDataType[]>,
) => (MenuItemsDataType & { children: MenuItemsDataType[] })[];

export const mapMenuData: MapMenuDataType = (data) =>
  data.map((item) => ({
    key: item.id,
    label: item.title,
    name: item.title,
    link: item.name,
  }));

export const mapSubMenuData: MapSubMenuDataType = (data) =>
  Object.keys(data).map((item) => ({
    id: `subMenu-${item}-${Math.random()}`,
    name: item,
    title: item,
    children: data[item],
  }));

export function useSidebar() {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const subMenuNaviData = useMemo(() => fetchMockData(subMenuNavi) ?? {}, [fetchMockData, subMenuNavi]);
  const menuItemNaviData = useMemo(() => fetchMockData(menuItemNavi) ?? [], [fetchMockData, menuItemNavi]);
  const subMenuItems = useMemo(() => mapSubMenuData(subMenuNaviData) ?? [], [subMenuNaviData]);

  const onOpenChange = useCallback((keys) => setOpenKeys(keys), []);

  return {
    menuItemNaviData,
    subMenuNaviData,
    subMenuItems,
    openKeys,
    setOpenKeys,
    onOpenChange,
  };
}

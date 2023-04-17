import { useCallback, useMemo, useState } from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import useSWR from 'swr';
import { environments } from '../../environments';
import { fetchData } from '../../fetch';

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

  const menuUrl = useMemo(() => `${environments.DOCKER_HOST}/menuItemNavi`, [environments]);
  const subMenuUrl = useMemo(() => `${environments.DOCKER_HOST}/subMenuNavi`, [environments]);

  const { data: menuItemNaviData } = useSWR(menuUrl, fetchData);
  const { data: subMenuNaviData } = useSWR(subMenuUrl, fetchData);

  const subMenuItems = useMemo(() => mapSubMenuData(subMenuNaviData ?? []) ?? [], [subMenuNaviData]);

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

import React, { useMemo } from 'react';
import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import menuItemNavi from '@/src/mock/db/utils/sidebar/menuItemNavi.json';
import subMenuNavi from '@/src/mock/db/utils/sidebar/subMenuNavi.json';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuProps } from 'antd';

export type MenuItemsDataType = {
  id: string | number;
  name: string;
  title: string;
};
export type SubMenuItemsDataType = Record<string, MenuItemsDataType[]>;
export type MapMenuDataType = (data: MenuItemsDataType[]) => ItemType[];
export type MapSubMenuDataType = (data: Record<string, MenuItemsDataType[]>) => ItemType[];

export const mapMenuData: MapMenuDataType = (data) =>
  data.map((item) => ({
    key: item.id,
    label: item.title,
    name: item.title,
    link: item.name,
  }));

export const mapSubMenuData: MapSubMenuDataType = (data) =>
  Object.keys(data).map((item) => ({
    type: 'group',
    id: `subMenu-${item}-${Math.random()}`,
    name: item,
    label: item,
    children: mapMenuData(data[item]),
  }));

export function useSidebar() {
  const subMenuNaviData = useMemo(() => fetchMockData(subMenuNavi) ?? {}, [fetchMockData, subMenuNavi]);
  const menuItemNaviData = useMemo(() => fetchMockData(menuItemNavi) ?? [], [fetchMockData, menuItemNavi]);

  const subMenuItems = useMemo(() => mapSubMenuData(subMenuNaviData), [subMenuNaviData]);
  const menuItems = useMemo(() => mapMenuData(menuItemNaviData), [menuItemNaviData]);

  return {
    subMenuItems,
    menuItems,
  };
}

import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

export type MenuApiDataType = {
  id: number;
  name: string;
  is_menu: boolean;
  route?: string;
  items?: MenuApiDataType[];
};

export type MenuDisplayDataType = {
  label: string;
  icon: string;
  link?: string;
  items?: MenuDisplayDataType[];
};

const mapApiDataWithItems = (data: MenuApiDataType[]): MenuApiDataType[] =>
  data.map((item) => ({ id: 0, is_menu: true, name: '', items: [item] }));

const recursiveMenuData = (
  data: MenuApiDataType[],
  index: number,
  arr: MenuDisplayDataType[],
): MenuDisplayDataType[] => {
  const current = data?.[index];
  if (!current) return arr;

  const basic = {
    label: current.name,
    icon: '',
  };

  const newArr = [
    ...arr,
    current.is_menu && current.items
      ? {
          ...basic,
          items: recursiveMenuData(current.items, 0, []),
        }
      : { ...basic, link: current.route },
  ];

  return recursiveMenuData(data, index + 1, newArr);
};

export function useSidebar() {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { data } = useSWR('/naviItem');
  const naviItemData = useMemo(
    () => recursiveMenuData(mapApiDataWithItems(data?.data ?? []), 0, []) ?? [],
    [data, mapApiDataWithItems, recursiveMenuData],
  );

  const onOpenChange = useCallback((keys: any) => setOpenKeys(keys), []);

  return {
    naviItemData,
    openKeys,
    setOpenKeys,
    onOpenChange,
  };
}

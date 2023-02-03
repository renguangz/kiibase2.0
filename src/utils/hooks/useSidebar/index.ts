import { useMemo } from 'react';
import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import sidebarMockData from '@/src/mock/db/sidebar.json';
import { GenericDataType, PrimaryKey } from '../..';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number] & { link: string | null };

function reduceSidebarData(data: SidebarDataType[], array: MenuItem[], index: number): MenuItem[] {
  const head = data[index];
  if (!head) return array;

  if (head.sub) {
    array.push({ key: head.id, label: head.title, link: null, children: reduceSidebarData(head.sub, [], 0) });
  } else {
    array.push({ key: head.id, label: head.title, link: head.link });
  }

  return reduceSidebarData(data, array, index + 1);
}

export type SidebarDataType = {
  id: PrimaryKey;
  title: string;
  link: string | null;
  sub: SidebarDataType[] | null;
};

export type SidebarDataResponseType = GenericDataType<SidebarDataType[]>;

export function useSidebar() {
  const data = useMemo(() => fetchMockData(sidebarMockData)?.data, []);

  const result = useMemo(() => reduceSidebarData(data, [], 0), [data]);

  return {
    data: result,
  };
}

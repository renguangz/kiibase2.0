import { useSidebar } from '.';
import { renderHook } from '@testing-library/react';
import naviItem from '@/src/mock/db/utils/sidebar/naviItem.json';
import displayNaviItem from '@/src/mock/db/utils/sidebar/displaNaviItem.json';
import useSWR from 'swr';

jest.mock('swr');

describe('useSidebar', () => {
  describe('menu items', () => {
    it('should have 3 menus', async () => {
      (useSWR as jest.Mock).mockReturnValue({
        data: naviItem,
      });
      const { result } = renderHook(() => useSidebar());
      expect(result.current.naviItemData).toHaveLength(3);
      expect(result.current.naviItemData).toStrictEqual(displayNaviItem);
    });
  });
});

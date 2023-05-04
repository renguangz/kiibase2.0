import { useSidebar } from '.';
import { renderHook } from '@testing-library/react';
import menuItemNavi from '@/src/mock/db/utils/sidebar/menuItemNavi.json';
import subMenuNavi from '@/src/mock/db/utils/sidebar/subMenuNavi.json';
import useSWR from 'swr';

jest.mock('swr');

describe('useSidebar', () => {
  describe('menu items', () => {
    it('should have 7 menu navi items', () => {
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('menuItemNavi') ? menuItemNavi : subMenuNavi,
      }));
      const { result } = renderHook(useSidebar);
      expect(result.current.menuItemNaviData.length).toEqual(7);
    });

    it('should have 6 sub menu navi items', () => {
      const { result } = renderHook(useSidebar);
      expect(result.current.subMenuItems.length).toEqual(6);
    });

    it('should have label but no link with sub menu', () => {
      const { result } = renderHook(useSidebar);
      const subMenuItems = result.current.subMenuItems;

      subMenuItems.forEach((item) => expect(item).toHaveProperty('title'));
      subMenuItems.forEach((item) => expect(item).not.toHaveProperty('link'));
    });
  });
});

import { useSidebar } from '.';
import { renderHook } from '@testing-library/react';
import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import menuItemNavi from '@/src/mock/db/utils/sidebar/menuItemNavi.json';
import subMenuNavi from '@/src/mock/db/utils/sidebar/subMenuNavi.json';

type FetchDataUrlType = 'menuItemNavi' | 'subMenuNavi';

jest.mock('../../fetch', () => {
  return {
    async fetchData(url: FetchDataUrlType) {
      switch (url) {
        case 'menuItemNavi':
          return fetchMockData(menuItemNavi);
        case 'subMenuNavi':
          return fetchMockData(subMenuNavi);
        default:
          return null;
      }
    },
  };
});

describe('useSidebar', () => {
  describe('menu items', () => {
    it('should have 6 sub menu navi items', () => {
      const { result } = renderHook(useSidebar);
      expect(result.current.subMenuItems.length).toEqual(6);
    });

    it('should have label but no link with sub menu', () => {
      const { result } = renderHook(useSidebar);
      const subMenuItems = result.current.subMenuItems;

      subMenuItems.forEach((item) => expect(item).toHaveProperty('label'));
      subMenuItems.forEach((item) => expect(item).not.toHaveProperty('link'));
    });

    it('should have 7 menu without sub navi items', () => {
      const { result } = renderHook(useSidebar);
      expect(result.current.menuItems.length).toEqual(7);
    });

    it('should have label and link on every items', () => {
      const { result } = renderHook(useSidebar);
      const menuItems = result.current.menuItems;

      menuItems.forEach((item) => expect(item).toHaveProperty('label'));
      menuItems.forEach((item) => expect(item).toHaveProperty('link'));
    });
  });
});

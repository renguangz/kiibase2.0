import { useSidebar } from '.';
import { renderHook } from '@testing-library/react';
import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import sidebarMockData from '@/src/mock/db/sidebar.json';

jest.mock('../../fetch', () => {
  return {
    async fetchData() {
      return fetchMockData(sidebarMockData);
    },
  };
});

describe('useSidebar', () => {
  describe('menu items', () => {
    it('should return 5 items', () => {
      const { result } = renderHook(useSidebar);
      expect(result.current.data).toHaveLength(5);
    });

    it('should change data to `MenuItem` type data', () => {
      const { result } = renderHook(useSidebar);
      const sidebarData = result.current.data;

      expect(sidebarData[0]).toHaveProperty('key');
      expect(sidebarData[0]).toHaveProperty('label');
      expect(sidebarData[0]).toHaveProperty('link');
    });

    it('first item should not have child but second item should have', () => {
      const { result } = renderHook(useSidebar);
      const sidebarData = result.current.data;

      expect(sidebarData[0]).not.toHaveProperty('children');
      expect(sidebarData[0]).toHaveProperty('link');
      expect(sidebarData[1]).toHaveProperty('children');
      expect(sidebarData[1].link).toEqual(null);
    });

    it('second item should have two children', () => {
      const { result } = renderHook(useSidebar);
      const sidebarData = result.current.data;
      const secondData = sidebarData[1];

      expect(secondData).toHaveProperty('children');
    });
  });
});

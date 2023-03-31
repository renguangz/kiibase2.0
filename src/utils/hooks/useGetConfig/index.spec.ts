import { renderHook } from '@testing-library/react';
import { useGetConfig } from '.';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog.json';

jest.mock('swr');

describe('useGetConfig', () => {
  describe('searchLog', () => {
    beforeEach(() => {
      const mockUseSwr = jest.requireMock('swr').default;
      mockUseSwr.mockReturnValue({
        data: searchLogConfig,
      });
    });
    it('should get topic `搜尋紀錄`, routes `searchLog`, date_filter and', () => {
      const { result } = renderHook(() => useGetConfig('/searchLog'));
      const data = result.current.data;

      expect(data?.topic).toEqual('搜尋紀錄');
      expect(data?.routes).toEqual('searchLog');
      expect(data?.date_filter).toBeTruthy();
    });

    it('should have attribute `field` and `header` in columns', async () => {
      const { result } = renderHook(() => useGetConfig('/test'));
      const columns = result.current.columns;

      columns?.forEach((column) => {
        expect(column).toHaveProperty('field');
        expect(column).toHaveProperty('header');
      });
    });
  });
});

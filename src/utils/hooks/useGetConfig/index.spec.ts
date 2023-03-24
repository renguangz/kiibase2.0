import { renderHook } from '@testing-library/react';
import { useGetConfig } from '.';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog.json';

describe('useGetConfig', () => {
  describe('searchLog', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(searchLogConfig),
        }),
      );
    });

    it('should get topic `搜尋紀錄`, routes `searchLog`, date_filter and', () => {
      const { result } = renderHook(() => useGetConfig('/searchLog'));

      const data = result.current.data;

      expect(data?.topic).toEqual('搜尋紀錄');
      expect(data?.routes).toEqual('searchLog');
      expect(data?.date_filter).toBeTruthy();
    });
  });
});

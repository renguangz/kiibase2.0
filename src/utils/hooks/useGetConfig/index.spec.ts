import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import { renderHook } from '@testing-library/react';
import { useGetConfig } from '.';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog.json';

type FetchDataUrlType = '/searchLog';

jest.mock('../../fetch.ts', () => {
  return {
    async fetchData(url: FetchDataUrlType) {
      switch (url) {
        case '/searchLog':
          return fetchMockData(searchLogConfig);
        default:
          return null;
      }
    },
  };
});

describe('useGetConfig', () => {
  describe('searchLog', () => {
    it('should get topic `搜尋紀錄`, routes `searchLog`, date_filter and', () => {
      const { result } = renderHook(() => useGetConfig('/searchLog'));

      const data = result.current.data;

      expect(data?.topic).toEqual('搜尋紀錄');
      expect(data?.routes).toEqual('searchLog');
      expect(data?.date_filter).toBeTruthy();
    });
  });
});

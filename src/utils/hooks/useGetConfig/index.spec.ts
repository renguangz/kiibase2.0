import { renderHook } from '@testing-library/react';
import { useGetConfig } from '.';
import useSWR from 'swr';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog.json';
import bannerConfig from '@/src/mock/db/utils/getConfig/bannerConfig.json';

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

  describe('Banner', () => {
    it('banner columns should have header, name and field', async () => {
      const expectColumns = [
        { field: undefined, name: '__checkbox', header: undefined },
        { field: 'id', name: 'id', header: 'ID' },
        { field: 'title', name: 'title', header: '標題' },
        { field: 'pic', name: '__component:list-image', header: '封面圖' },
        { field: 'device', name: 'device_name', header: '所在位置' },
        { field: 'status', name: '__component:list-select', header: '狀態' },
        { field: 'order', name: '__component:list-input', header: '權重' },
        { field: undefined, name: '__slot:actions', header: '操作' },
      ];
      (useSWR as jest.Mock).mockReturnValue({
        data: bannerConfig,
      });

      const { result } = renderHook(() => useGetConfig('banner'));
      expect(result.current.columns).toStrictEqual(expectColumns);
    });
  });
});

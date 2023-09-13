import { renderHook } from '@testing-library/react';
import { useGetConfig } from './index';
import roleConfig from '@/mocks/db/utils/getConfig/roleConfig.json';

jest.mock('swr');

describe('useGetConfig', () => {
  describe('role', () => {
    beforeEach(() => {
      const mockUseSwr = jest.requireMock('swr').default;
      mockUseSwr.mockReturnValue({
        data: roleConfig,
      });
    });
    it('should get topic `後台管理者角色`, no date_filter', () => {
      const { result } = renderHook(() => useGetConfig('/role'));
      const data = result.current.data;

      expect(data?.topic).toEqual('後台管理者角色');
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

    it('columns should have header, name and field', async () => {
      const expectColumns = [
        { field: '', name: '__checkbox', header: '' },
        { field: 'id', name: 'label', header: 'ID' },
        { field: 'name', name: 'label', header: '名稱' },
        { field: 'created_at', name: 'label', header: '建立時間' },
        { field: 'updated_at', name: 'label', header: '更新時間' },
        { field: '', name: '__slot:actions', header: '操作' },
      ];

      const { result } = renderHook(() => useGetConfig('role'));
      expect(result.current.columns).toStrictEqual(expectColumns);
    });
  });
});

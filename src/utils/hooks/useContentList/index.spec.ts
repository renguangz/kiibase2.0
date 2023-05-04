import { renderHook } from '@testing-library/react-hooks';
import { useContentList } from '.';
import useSWR from 'swr';
import initSearchLog from '@/src/mock/db/utils/ContentList/searchLog/initList.json';

jest.mock('swr');

describe('useContentList', () => {
  describe('search log', () => {
    it('should have data', async () => {
      const mockUseSwr = jest.requireMock('swr').default;
      mockUseSwr.mockReturnValue({
        data: initSearchLog,
      });

      const { result } = renderHook(() => useContentList('/searchLog'));

      const params = {
        page: 1,
        per_page: 10,
        sort: 'id%7Cdesc',
      };

      expect(useSWR).toHaveBeenCalledTimes(1);
      expect(useSWR).toHaveBeenCalledWith(['/searchLog', { params }]);
      expect(mockUseSwr).toHaveBeenCalledTimes(1);
      expect(result.current.data.length).toBe(10);
      expect(result.current.total).toBe(419);
    });
  });
});

import { renderHook } from '@testing-library/react-hooks';
import { useContentList } from '.';
import useSWR from 'swr';
import initRole from '@/src/mock/db/utils/ContentList/role/initList.json';

jest.mock('swr');

describe('useContentList', () => {
  describe('search log', () => {
    it('should have data', async () => {
      const mockUseSwr = jest.requireMock('swr').default;
      mockUseSwr.mockReturnValue({
        data: initRole,
      });

      const { result } = renderHook(() => useContentList('/role'));

      const params = {
        page: 1,
        per_page: 10,
      };

      expect(useSWR).toHaveBeenCalledTimes(1);
      expect(useSWR).toHaveBeenCalledWith(['/model/role', { params }]);
      expect(mockUseSwr).toHaveBeenCalledTimes(1);
      expect(result.current.data.length).toBe(10);
      expect(result.current.total).toBe(51);
    });
  });
});

import { renderHook } from '@testing-library/react-hooks';
import { useContentList } from './index';
import useSWR from 'swr';
import initRole from '@/mocks/db/utils/ContentList/role/initList.json';

jest.mock('swr');

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

describe('useContentList', () => {
  describe('role', () => {
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

import { renderHook } from '@testing-library/react-hooks';
import { useContentList } from '.';
import useSWR from 'swr';
import initSearchLog from '@/src/mock/db/utils/ContentList/searchLog/initList.json';
import * as fetchUtils from '@/src/utils/fetch';

jest.mock('swr');

jest.mock('@/src/utils/fetch');

describe('useContentList', () => {
  describe('search log', () => {
    it('should have data', async () => {
      const mockUseSwr = jest.requireMock('swr').default;
      mockUseSwr.mockReturnValue({
        data: initSearchLog,
      });

      const { result } = renderHook(() => useContentList('/searchLog'));

      expect(useSWR).toHaveBeenCalledTimes(1);
      expect(mockUseSwr).toHaveBeenCalledTimes(1);
      expect(result.current.data.length).toBe(10);
      expect(result.current.total).toBe(419);
    });

    describe('filter data', () => {
      it('should add `filter=haha` to swr queries after fire handleSearch', async () => {
        const initSwr = [expect.stringContaining('/searchLog'), '?page=1&perPage=10&sort=id%7Cdesc'];
        expect(useSWR).toHaveBeenCalledWith(initSwr, fetchUtils.fetchDataWithQueries);
      });
    });
  });
});

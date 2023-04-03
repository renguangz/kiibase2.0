import { renderHook } from '@testing-library/react-hooks';
import { useCreateContent } from '.';
import useSWR from 'swr';
import CreateCatalog from '@/src/mock/db/utils/CreateContent/CreateCatalog';

jest.mock('swr');

describe('useCreateContent', () => {
  describe('Catalog', () => {
    it('should return create config data', async () => {
      const mockUseSwr = jest.requireMock('swr').default;
      mockUseSwr.mockReturnValue({
        data: CreateCatalog,
      });

      const { result } = renderHook(() => useCreateContent('/searchLog'));
      const data = result.current.data;
      expect(useSWR).toHaveBeenCalledTimes(1);
      expect(mockUseSwr).toHaveBeenCalledTimes(1);

      expect(data?.topic).toEqual('電子型錄');
      expect(data?.routes).toEqual('catalog');
    });
  });
});

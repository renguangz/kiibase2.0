import { renderHook } from '@testing-library/react-hooks';
import { useFilterField } from './index';
import { useGetConfig } from '../useGetConfig';

jest.mock('../useGetConfig/');

describe('useFilterField', () => {
  const setup = (asPath: string) => {
    const { result } = renderHook(() => useFilterField(asPath));
    return result.current;
  };
  const mockUseGetConfig = useGetConfig as jest.MockedFunction<typeof useGetConfig>;

  describe('banner', () => {
    it('should return search input filter', async () => {
      mockUseGetConfig.mockReturnValue({
        data: {
          filter: [],
        },
      });
      const filters = setup('/banner');
      expect(filters.data).toHaveLength(1);

      const input = filters.data[0];
      expect(input.component).toEqual('InputTextComponent');
    });
  });

  describe('search log', () => {
    it('should return search input and date range filters', async () => {
      mockUseGetConfig.mockReturnValue({
        data: {
          filter: [],
          date_filter: true,
        },
      });
      const filters = setup('/searchLog');
      expect(filters.data).toHaveLength(3);

      const expectFilterName = ['start_date', 'end_date', 'keyword'];
      const expectFilterComponent = ['CalendarComponent', 'CalendarComponent', 'InputTextComponent'];

      filters.data.forEach((filter, index) => {
        expect(filter.props.name).toEqual(expectFilterName[index]);
        expect(filter.component).toEqual(expectFilterComponent[index]);
      });
    });

    it('should ', async () => {
      const result = setup('/searchLog');
    });
  });
});

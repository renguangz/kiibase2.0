import ContentListPage from '@/pages/[content]';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog';
import searchListData from '@/src/mock/db/utils/ContentList/searchLog/initList';

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/searchLog',
  }),
}));

const { result } = renderHook(() => useForm({ defaultValues: { tableSearch: '' } }));

const mockUseFilterField = jest.fn(() => ({
  form: result.current,
  data: [
    { component: 'InputTextComponent', props: { lable: 'table search title', name: 'tableSearch', required: false } },
  ],
}));

const mockUseContentList = jest.fn(() => ({
  data: searchListData.data,
}));

const mockUseGetConfig = jest.fn(() => ({
  data: searchLogConfig,
  columns: searchLogConfig.list.map((item: any) => ({ field: item.name, header: item.title })),
  total: 10,
}));

jest.mock('@/src/utils/hooks', () => ({
  useContentList: () => mockUseContentList(),
  useFilterField: () => mockUseFilterField(),
  useGetConfig: () => mockUseGetConfig(),
}));

describe('ContentListPage', () => {
  beforeEach(() => {
    render(<ContentListPage />);
  });

  describe('SearchLog Page', () => {
    it('should have title `搜尋紀錄列表` and subtitle `檢視全部搜尋紀錄`', async () => {
      const title = screen.getByRole('heading', { name: /搜尋紀錄列表/ });
      expect(title).toBeInTheDocument();
    });

    it('should have table with columns `ID`, `關鍵字`, `會員`, `時間`, `IP位置`, `語系`', async () => {
      const expectColumns = ['ID', '關鍵字', '會員', '時間', 'IP位置', '語系'];
      const columns = document.querySelectorAll('.p-column-title');
      expect(columns.length).toBe(expectColumns.length);

      columns.forEach((column, index) => {
        expect(column.innerHTML).toEqual(expectColumns[index]);
      });
    });

    it('should have table', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const searchInput = document.getElementById('tableSearch') as HTMLInputElement;
      expect(searchInput).toHaveValue('');

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);

      await userEvent.type(searchInput, 'no content');
      expect(searchInput).toHaveValue('no content');

      userEvent.click(submitButton);

      mockUseContentList.mockReturnValueOnce({
        data: [],
      });
    });

    it('should update table by filter', async () => {
      // @TODO: 要測試 rerender
    });
  });
});

import ContentListPage from '@/pages/[content]';
import useSWR from 'swr';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog.json';
import bannerConfig from '@/src/mock/db/utils/getConfig/bannerConfig.json';
import searchListData from '@/src/mock/db/utils/ContentList/searchLog/initList.json';
import bannerListData from '@/src/mock/db/utils/ContentList/banner/initList.json';
import searchListEmptyData from '@/src/mock/db/utils/ContentList/searchLog/filterData/filter_empty.json';
import searchListFilterData from '@/src/mock/db/utils/ContentList/searchLog/filterData/filter_haha.json';
import { useRouter } from 'next/router';
import * as fetchUtils from '@/src/utils/fetch';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('swr');

jest.mock('@/src/utils/fetch');

describe('ContentListPage', () => {
  const mockDateNow = new Date('2023-04-28T00:00:00.000Z');
  describe('SearchLog Page', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(mockDateNow);
      jest.resetAllMocks();

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getConfig')
          ? searchLogConfig
          : url.includes('no_content')
          ? searchListEmptyData
          : url.includes('haha')
          ? searchListFilterData
          : searchListData,
      }));

      (useRouter as jest.Mock).mockReturnValue({
        asPath: '/searchLog',
      });

      render(<ContentListPage />);
      jest.useRealTimers();
    });

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

    it('should have table with not value after filtering', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const searchInput = document.getElementById('filter') as HTMLInputElement;
      expect(searchInput).toHaveValue('');

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);

      await userEvent.type(searchInput, 'no content');
      expect(searchInput).toHaveValue('no content');

      await userEvent.click(submitButton);
      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('searchLog'), expect.stringContaining('filter=no+content')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should update table by filter', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const searchInput = document.getElementById('filter') as HTMLInputElement;
      expect(searchInput).toHaveValue('');

      await userEvent.type(searchInput, 'haha');
      await userEvent.click(submitButton);
      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('searchLog'), expect.stringContaining('filter=haha')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should update table by calendar `start_date` and `tableSearch` filter', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const startDateInput = document.getElementById('start_date') as HTMLInputElement;
      const endDateInput = document.getElementById('end_date') as HTMLInputElement;
      expect(startDateInput).toBeInTheDocument();
      expect(endDateInput).toBeInTheDocument();

      const searchInput = document.getElementById('filter') as HTMLInputElement;
      await userEvent.type(searchInput, 'haha');
      await userEvent.click(startDateInput);
      const chosenStartDate = screen.queryByText('15') as HTMLSpanElement;
      expect(chosenStartDate).toBeInTheDocument();
      await userEvent.click(chosenStartDate);
      await userEvent.click(submitButton);

      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('searchLog'), expect.stringContaining('start_date=2023-04-15&filter=haha')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should update table by calendar `end_date` and `tableSearch` filter', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const startDateInput = document.getElementById('start_date') as HTMLInputElement;
      const endDateInput = document.getElementById('end_date') as HTMLInputElement;
      expect(startDateInput).toBeInTheDocument();
      expect(endDateInput).toBeInTheDocument();

      const searchInput = document.getElementById('filter') as HTMLInputElement;
      await userEvent.type(searchInput, 'no content');
      await userEvent.click(endDateInput);
      const chosenStartDate = screen.queryAllByText('28')[1] as HTMLSpanElement;
      expect(chosenStartDate).toBeInTheDocument();
      await userEvent.click(chosenStartDate);
      await userEvent.click(submitButton);

      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('searchLog'), expect.stringContaining('end_date=2023-04-28&filter=no+content')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should call useSWR after clicking submit button', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      await userEvent.click(submitButton);
      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('searchLog'), expect.not.stringContaining('filter=')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should not have delete button and checkboxes', () => {
      const deleteButton = screen.queryByRole('button', { name: '刪除' });
      expect(deleteButton).not.toBeInTheDocument();
      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(0);
    });

    it('should call useSWR after changing pages', async () => {
      const page4 = screen.queryByRole('button', { name: '4' }) as HTMLButtonElement;
      expect(page4).toBeInTheDocument();
      await userEvent.click(page4);
      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('api/searchLog'), expect.stringContaining('page=4')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should call useSWR after changing `per_page', async () => {
      const dropdown = document.querySelector('.p-dropdown-label') as HTMLDivElement;
      expect(dropdown).toBeInTheDocument();
      await userEvent.click(dropdown);
      const option20 = screen.queryByText(20) as HTMLOptionElement;
      expect(option20).toBeInTheDocument();
      await userEvent.click(option20);
      expect(useSWR).toHaveBeenNthCalledWith(
        8,
        [expect.stringContaining('api/searchLog'), expect.stringContaining('page=1&per_page=20')],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should call useSWR when changing pages and will call useSWR with page=1 after search filter', async () => {
      const page4 = screen.queryByRole('button', { name: '4' }) as HTMLButtonElement;
      expect(page4).toBeInTheDocument();
      await userEvent.click(page4);

      const searchInput = document.getElementById('filter') as HTMLInputElement;
      await userEvent.type(searchInput, 'haha');
      const submitButton = screen.getByRole('button', { name: '送出' });
      await userEvent.click(submitButton);
      expect(useSWR).toHaveBeenNthCalledWith(
        11,
        [expect.stringContaining('searchLog'), '?page=1&per_page=10&sort=id%7Cdesc&filter=haha'],
        fetchUtils.fetchDataWithQueries,
      );
    });

    it('should call useSWR with `page=1` after changing per_page', async () => {
      const page4 = screen.queryByRole('button', { name: '4' }) as HTMLButtonElement;
      expect(page4).toBeInTheDocument();
      await userEvent.click(page4);

      const dropdown = document.querySelector('.p-dropdown-label') as HTMLDivElement;
      expect(dropdown).toBeInTheDocument();
      await userEvent.click(dropdown);
      const option20 = screen.queryByText(20) as HTMLOptionElement;
      expect(option20).toBeInTheDocument();
      await userEvent.click(option20);
      expect(useSWR).toHaveBeenNthCalledWith(
        11,
        [expect.stringContaining('searchLog'), expect.stringContaining('page=1&per_page=20')],
        fetchUtils.fetchDataWithQueries,
      );
    });
  });

  describe('Banner Page', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getConfig') ? bannerConfig : bannerListData,
      }));
      (useRouter as jest.Mock).mockReturnValue({
        asPath: '/banner',
      });

      render(<ContentListPage />);
    });

    it('should have delete button for deleting multiple table data', async () => {
      const deleteButton = screen.queryByRole('button', { name: '刪除' }) as HTMLButtonElement;
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toBeDisabled();

      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(bannerListData.data.length + 1);

      await userEvent.click(checkboxes[1]);
      await userEvent.click(checkboxes[2]);

      expect(deleteButton).toBeEnabled();
      await userEvent.click(deleteButton);
      expect(fetchUtils.fetchPostData).toHaveBeenCalledWith(expect.stringContaining('/banner/deleteAll'), [9, 7]);
    });
  });
});

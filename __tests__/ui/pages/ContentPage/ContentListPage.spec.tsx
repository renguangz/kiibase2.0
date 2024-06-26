import ContentListPage from '/pages/[content]';
import useSWR from 'swr';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import roleConfig from '@/mocks/db/utils/getConfig/roleConfig.json';
import machineConfig from '@/mocks/db/utils/getConfig/machineConfig.json';
import bannerConfig from '@/mocks/db/utils/getConfig/bannerConfig.json';
import homeConfig from '@/mocks/db/utils/getConfig/homepageConfig.json';
import roleListData from '@/mocks/db/utils/ContentList/role/initList.json';
import machineListData from '@/mocks/db/utils/ContentList/machine/initList.json';
import bannerListData from '@/mocks/db/utils/ContentList/banner/initList.json';
import roleListEmptyData from '@/mocks/db/utils/ContentList/role/filter/emptyList.json';
import searchListFilterData from '@/mocks/db/utils/ContentList/searchLog/filterData/filter_haha.json';
import { useRouter } from 'next/router';
import * as requestUtils from '@/utils/request';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('swr');

jest.mock('@/utils/request', () => ({
  ...jest.requireActual('@/utils/request'),
  request: jest.fn(),
}));

describe('ContentListPage', () => {
  const mockDateNow = new Date('2023-04-28T00:00:00.000Z');
  describe('Role Page', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(mockDateNow);
      jest.resetAllMocks();

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getConfig')
          ? roleConfig
          : url.includes('no_content')
          ? roleListEmptyData
          : url.includes('haha')
          ? searchListFilterData
          : roleListData,
        mutate: jest.fn(),
      }));

      (useRouter as jest.Mock).mockReturnValue({
        asPath: '/role',
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
      });

      render(<ContentListPage />);
      jest.useRealTimers();
    });

    it('should have title `搜尋紀錄列表` and subtitle `檢視全部搜尋紀錄`', async () => {
      const title = screen.getByRole('heading', { name: /後台管理者角色列表/ });
      expect(title).toBeInTheDocument();
    });

    it('should have table with columns', async () => {
      const expectColumns = ['', 'ID', '名稱', '建立時間', '更新時間', '操作'];
      const columns = document.querySelectorAll('.p-column-title');
      expect(columns.length).toBe(expectColumns.length);

      columns.forEach((column, index) => {
        expect(column.innerHTML).toEqual(expectColumns[index]);
      });
    });

    it('should have table with no value after filtering', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const searchInput = document.getElementById('keyword') as HTMLInputElement;
      expect(searchInput).toHaveValue('');

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(11);

      await userEvent.type(searchInput, 'no content');
      expect(searchInput).toHaveValue('no content');

      await userEvent.click(submitButton);
      const params = {
        keyword: 'no+content',
        page: 1,
        per_page: 10,
      };
      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should update table by filter', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const searchInput = document.getElementById('keyword') as HTMLInputElement;
      expect(searchInput).toHaveValue('');

      await userEvent.type(searchInput, 'haha');
      await userEvent.click(submitButton);
      const params = {
        keyword: 'haha',
        page: 1,
        per_page: 10,
      };
      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should update table by calendar `start_date` and `tableSearch` filter', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const startDateInput = document.getElementById('start_date') as HTMLInputElement;
      const endDateInput = document.getElementById('end_date') as HTMLInputElement;
      expect(startDateInput).toBeInTheDocument();
      expect(endDateInput).toBeInTheDocument();

      const searchInput = document.getElementById('keyword') as HTMLInputElement;
      await userEvent.type(searchInput, 'haha');
      await userEvent.click(startDateInput);
      const chosenStartDate = screen.queryByText('15') as HTMLSpanElement;
      expect(chosenStartDate).toBeInTheDocument();
      await userEvent.click(chosenStartDate);
      await userEvent.click(submitButton);

      const params = {
        keyword: 'haha',
        page: 1,
        per_page: 10,
        start_date: '2023-04-15',
      };

      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should update table by calendar `end_date` and `tableSearch` filter', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      const startDateInput = document.getElementById('start_date') as HTMLInputElement;
      const endDateInput = document.getElementById('end_date') as HTMLInputElement;
      expect(startDateInput).toBeInTheDocument();
      expect(endDateInput).toBeInTheDocument();

      const searchInput = document.getElementById('keyword') as HTMLInputElement;
      await userEvent.type(searchInput, 'no content');
      await userEvent.click(endDateInput);
      const chosenStartDate = screen.queryAllByText('28')[1] as HTMLSpanElement;
      expect(chosenStartDate).toBeInTheDocument();
      await userEvent.click(chosenStartDate);
      await userEvent.click(submitButton);

      const params = {
        keyword: 'no+content',
        page: 1,
        per_page: 10,
        end_date: '2023-04-28',
      };

      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should call useSWR after clicking submit button', async () => {
      const submitButton = screen.getByRole('button', { name: '送出' });
      await userEvent.click(submitButton);

      const params = {
        page: 1,
        per_page: 10,
      };

      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should have delete button and 11 checkboxes', () => {
      const deleteButton = screen.queryByRole('button', { name: '批次刪除' });
      expect(deleteButton).toBeInTheDocument();
      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(11);
    });

    it('should call useSWR after changing pages', async () => {
      const page4 = screen.queryByText('4') as HTMLButtonElement;
      expect(page4).toBeInTheDocument();
      await userEvent.click(page4);
      const params = {
        page: 4,
        per_page: 10,
      };
      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should call useSWR after changing `per_page', async () => {
      const dropdown = document.querySelector('.p-dropdown-label.p-inputtext') as HTMLElement;
      expect(dropdown).toBeInTheDocument();
      await userEvent.click(dropdown);
      const option20 = screen.queryByLabelText('20') as HTMLElement;
      expect(option20).toBeInTheDocument();
      await userEvent.click(option20);
      const params = {
        page: 1,
        per_page: 20,
      };
      expect(useSWR).toHaveBeenNthCalledWith(8, ['/model/role', { params }]);
    });

    it('should call useSWR when changing pages and will call useSWR with page=1 after search filter', async () => {
      const page4 = screen.queryByText('4') as HTMLButtonElement;
      expect(page4).toBeInTheDocument();
      await userEvent.click(page4);

      const searchInput = document.getElementById('keyword') as HTMLInputElement;
      await userEvent.type(searchInput, 'haha');
      const submitButton = screen.getByRole('button', { name: '送出' });
      await userEvent.click(submitButton);
      const params = {
        keyword: 'haha',
        page: 1,
        per_page: 10,
      };
      expect(useSWR).toHaveBeenNthCalledWith(11, ['/model/role', { params }]);
    });

    it('should call useSWR with `page=1` after changing per_page', async () => {
      const page4 = screen.queryByText('4') as HTMLButtonElement;
      expect(page4).toBeInTheDocument();
      await userEvent.click(page4);

      const dropdown = document.querySelector('.p-dropdown-label.p-inputtext') as HTMLElement;
      expect(dropdown).toBeInTheDocument();
      await userEvent.click(dropdown);
      const option20 = screen.queryByLabelText('20') as HTMLElement;
      expect(option20).toBeInTheDocument();
      await userEvent.click(option20);
      const params = {
        page: 1,
        per_page: 20,
      };
      expect(useSWR).toHaveBeenNthCalledWith(11, ['/model/role', { params }]);
    });

    it('should have delete button for deleting multiple table data', async () => {
      const deleteButton = screen.queryByRole('button', { name: '批次刪除' }) as HTMLButtonElement;
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toBeDisabled();

      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(roleListData.data.data.length + 1);

      await userEvent.click(checkboxes[1]);
      await userEvent.click(checkboxes[2]);

      expect(deleteButton).toBeEnabled();
      await userEvent.click(deleteButton);

      const cancelButton = screen.queryByRole('button', { name: '取消' }) as HTMLButtonElement;
      expect(cancelButton).toBeInTheDocument();
      await userEvent.click(cancelButton);

      await userEvent.click(deleteButton);
      const confirmButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(confirmButton).toBeInTheDocument();
      await userEvent.click(confirmButton);

      const body = JSON.stringify([51, 50]);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      expect(requestUtils.request).toHaveBeenCalledWith('/model/role/deleteList', {
        method: 'DELETE',
        body,
      });
    });

    it('should have delete buttons', async () => {
      const deleteButtons = screen.queryAllByRole('button', { name: '刪除' });
      expect(deleteButtons).toHaveLength(10);

      const firstDelete = deleteButtons[0];
      await userEvent.click(firstDelete);
    });

    it('should be disabled after clicking  confirm button', async () => {
      const deleteButton = screen.queryByRole('button', { name: '批次刪除' }) as HTMLButtonElement;

      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(roleListData.data.data.length + 1);

      await userEvent.click(checkboxes[1]);
      await userEvent.click(checkboxes[2]);

      expect(deleteButton).toBeEnabled();
      await userEvent.click(deleteButton);
      const confirmButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(confirmButton).toBeInTheDocument();
      await userEvent.click(confirmButton);

      expect(deleteButton).toBeDisabled();
    });

    it('will open confirm model and will call api `/model/role/:id` when click it', async () => {
      const deleteButtons = screen.queryAllByRole('button', { name: '刪除' });
      const firstDelete = deleteButtons[0];
      await userEvent.click(firstDelete);

      const cancelButton = screen.queryByRole('button', { name: '取消' }) as HTMLButtonElement;
      expect(cancelButton).toBeInTheDocument();
      await userEvent.click(cancelButton);

      await userEvent.click(firstDelete);
      const confirmButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(confirmButton).toBeInTheDocument();
      await userEvent.click(confirmButton);
      expect(requestUtils.request).toHaveBeenCalled();
      expect(requestUtils.request).toHaveBeenCalledWith('/model/role/51', { method: 'DELETE' });
    });
  });

  describe('Banner', () => {
    const setup = () => {
      render(<ContentListPage />);

      const inputFields = screen.queryAllByRole('textbox').filter((field) => field.className.includes('p-inputtext'));
      inputFields.shift();
      const updateButton = screen.getByRole('button', { name: /更新/ });
      const selectFields = document.querySelectorAll('.p-dropdown');
      return { inputFields, updateButton, selectFields };
    };

    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(mockDateNow);
      jest.resetAllMocks();

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getConfig')
          ? bannerConfig
          : url.includes('no_content')
          ? roleListEmptyData
          : url.includes('haha')
          ? searchListFilterData
          : bannerListData,
        mutate: jest.fn(),
      }));

      (useRouter as jest.Mock).mockReturnValue({
        asPath: '/banner',
        push: mockRouterPush,
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
      });

      jest.useRealTimers();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should have disabled update button', () => {
      const { updateButton } = setup();
      expect(updateButton).toBeInTheDocument();
      expect(updateButton).toBeDisabled();
    });

    it('should have one input field and one select field in table', async () => {
      setup();
      const inputFields = screen.queryAllByRole('textbox').filter((field) => field.className.includes('p-inputtext'));
      expect(inputFields).toHaveLength(11);
    });

    it('should have expect default value', async () => {
      const { inputFields } = setup();
      const expectValues = bannerListData.data.data.map((item) => item.order);
      expectValues.forEach((value, index) => {
        expect(inputFields[index]).toHaveValue(`${value}`);
      });
    });

    it('update button should be enabled after value changed', async () => {
      const { inputFields, updateButton } = setup();
      await userEvent.type(inputFields[0], '24');
      expect(updateButton).toBeEnabled();
    });

    it('update button should be disabled again after changing back to default value', async () => {
      const { inputFields, updateButton } = setup();
      await userEvent.type(inputFields[0], '24');
      await userEvent.clear(inputFields[0]);
      await userEvent.type(inputFields[0], '20');
      expect(updateButton).toBeDisabled();
    });

    it('should have enabled update button after changing select value', async () => {
      const { selectFields, updateButton } = setup();
      expect(selectFields).toHaveLength(11);
      const firstSelect = selectFields[0];
      await userEvent.click(firstSelect);
      const offline = screen.queryByLabelText(/下架/) as HTMLDivElement;
      expect(offline).toBeInTheDocument();
      await userEvent.click(offline);
      expect(updateButton).toBeEnabled();
    });

    it('should turn to disabled if changing value back to default value', async () => {
      const { selectFields, updateButton } = setup();
      const firstSelect = selectFields[0];
      await userEvent.click(firstSelect);
      const offline = screen.queryByLabelText(/下架/) as HTMLDivElement;
      await userEvent.click(offline);
      expect(updateButton).toBeEnabled();
      await userEvent.click(firstSelect);
      const online = screen.queryByLabelText(/上架/) as HTMLDivElement;
      expect(online).toBeInTheDocument();
      await userEvent.click(online);
      expect(updateButton).toBeDisabled();
    });

    it('should call `/model/banner/updateList` for changing input', async () => {
      const { inputFields, updateButton } = setup();
      await userEvent.clear(inputFields[0]);
      await userEvent.type(inputFields[0], '35');
      await userEvent.type(inputFields[1], '36');
      await userEvent.click(updateButton);

      const cancelButton = screen.queryByRole('button', { name: '取消' }) as HTMLButtonElement;
      expect(cancelButton).toBeInTheDocument();
      await userEvent.click(cancelButton);

      await userEvent.click(updateButton);
      const confirmButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(confirmButton).toBeInTheDocument();
      await userEvent.click(confirmButton);
      expect(requestUtils.request).toHaveBeenCalled();
      const expectPayload = [
        { id: 20, order: '35' },
        { id: 19, order: '3036' },
      ];
      expect(requestUtils.request).toHaveBeenCalledWith('/model/banner/updateList', {
        method: 'PUT',
        body: JSON.stringify(expectPayload),
      });
    });

    it('should call `/model/banner/updateList` for changing input and select', async () => {
      const { inputFields, selectFields, updateButton } = setup();

      const firstSelect = selectFields[0];
      await userEvent.click(firstSelect);
      const offline = screen.queryByLabelText(/下架/) as HTMLDivElement;
      await userEvent.click(offline);

      const thirdSelect = selectFields[2];
      await userEvent.click(thirdSelect);
      const thirdOffline = screen.queryAllByLabelText(/下架/)[1] as HTMLDivElement;
      await userEvent.click(thirdOffline);

      await userEvent.click(offline);
      await userEvent.clear(inputFields[0]);
      await userEvent.type(inputFields[0], '35');
      await userEvent.type(inputFields[1], '36');

      await userEvent.click(updateButton);

      const cancelButton = screen.queryByRole('button', { name: '取消' }) as HTMLButtonElement;
      expect(cancelButton).toBeInTheDocument();
      await userEvent.click(cancelButton);

      await userEvent.click(updateButton);
      const confirmButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(confirmButton).toBeInTheDocument();
      await userEvent.click(confirmButton);

      expect(requestUtils.request).toHaveBeenCalled();
      const expectPayload = [
        { id: 20, status: 'OFFLINE', order: '35' },
        { id: 19, order: '3036' },
        { id: 18, status: 'OFFLINE' },
      ];
      expect(requestUtils.request).toHaveBeenCalledWith('/model/banner/updateList', {
        method: 'PUT',
        body: JSON.stringify(expectPayload),
      });
    });

    it('should not have any delete buttons', async () => {
      setup();
      const deleteMultipleButton = screen.queryByRole('button', { name: '批次刪除' });
      const deleteButtons = screen.queryAllByRole('button', { name: '刪除' });
      expect(deleteMultipleButton).not.toBeInTheDocument();
      expect(deleteButtons).toHaveLength(0);
    });
  });

  describe('Machine', () => {
    const setup = () => {
      render(<ContentListPage />);

      const inputFields = screen.queryAllByRole('textbox').filter((field) => field.className.includes('p-inputtext'));
      inputFields.shift();
      const updateButton = screen.getByRole('button', { name: /更新/ });
      const selectFields = document.querySelectorAll('.p-dropdown');
      return { inputFields, updateButton, selectFields };
    };

    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(mockDateNow);
      jest.resetAllMocks();

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getConfig') ? machineConfig : machineListData,
      }));

      (useRouter as jest.Mock).mockReturnValue({
        asPath: '/machine',
        push: mockRouterPush,
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
      });

      jest.useRealTimers();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should have disabled updateButton', async () => {
      const { updateButton } = setup();
      expect(updateButton).toBeDisabled();
    });
  });

  describe('Homepage', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(mockDateNow);
      jest.resetAllMocks();

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getConfig') ? homeConfig : machineListData,
      }));

      (useRouter as jest.Mock).mockReturnValue({
        asPath: '/homepage',
        push: mockRouterPush,
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
      });

      jest.useRealTimers();

      render(<ContentListPage />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call router push to edit page', async () => {
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/homepage/2/edit');
    });
  });
});

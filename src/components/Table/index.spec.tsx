import { render, screen } from '@testing-library/react';
import { TableField, TableFieldProps } from '.';
import bannerList from '@/src/mocks/db/utils/ContentList/banner/initList.json';
import searchLogList from '@/src/mocks/db/utils/ContentList/searchLog/initList.json';
import userEvent from '@testing-library/user-event';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/test',
  }),
}));

const generateDataSource = (length: number, columns: { field: string }[], arr: any[]): Array<any> => {
  if (length < 1) return arr;
  const result = columns.reduce((acc, cur) => {
    return { ...acc, [cur.field]: `value-${cur.field}-${length}`, id: Math.random() };
  }, {});
  return generateDataSource(length - 1, columns, [...arr, result]);
};

describe('TableField', () => {
  describe('Mock Table', () => {
    const setup = (props: TableFieldProps) => {
      render(<TableField {...props} />);
    };

    it('should have 3 columns and 10 rows', () => {
      const expectTheads = ['col1', 'col2', 'col3'];
      const columns = expectTheads.map((thead) => ({
        field: `field-${thead}`,
        name: '',
        header: thead,
      }));
      const dataSource = generateDataSource(11, columns, []);
      setup({
        perPage: 10,
        columns,
        dataSource,
        total: 0,
        selectedRow: undefined,
        setSeletedRow: undefined,
        handleChangePage: jest.fn(),
        handleChangePerPage: jest.fn(),
        currentPage: 1,
      });

      const theads = document.querySelectorAll('.p-column-title');
      expect(theads).toHaveLength(3);
      theads.forEach((thead, index) => {
        expect(thead.innerHTML).toEqual(expectTheads[index]);
      });
    });
  });

  describe('Banner', () => {
    const props: TableFieldProps = {
      columns: [
        { field: '', name: '__checkbox', header: '' },
        { field: 'id', name: 'label', header: 'ID' },
        { field: 'pic', name: 'label', header: '圖片' },
        { field: 'status', name: 'list-select', header: '狀態' },
        { field: 'order', name: 'list-input', header: '權重' },
        { field: 'created_at', name: 'label', header: '建立時間' },
        { field: 'updated_at', name: 'label', header: '更新時間' },
        { field: '', name: '__slot:actions', header: '操作' },
      ],
      perPage: 10,
      dataSource: bannerList.data.data,
      total: bannerList.data.meta.total,
      selectedRow: undefined,
      setSeletedRow: undefined,
      handleChangePage: jest.fn(),
      handleChangePerPage: jest.fn(),
      currentPage: 1,
    };

    beforeEach(() => render(<TableField {...props} />));

    it('should have edit link', async () => {
      const links = screen.queryAllByRole('link') as HTMLLinkElement[];
      expect(links).toHaveLength(10);

      links.forEach((link, index) => {
        expect(link.href).toContain(`/test/${bannerList.data.data[index].id}/edit`);
      });
    });
  });

  describe('SearchLog', () => {
    const props: TableFieldProps = {
      columns: [
        { field: 'id', name: 'id', header: 'ID' },
        { field: 'keyword', name: 'keyword', header: '關鍵字' },
        { field: 'member_name', name: 'member_name', header: '會員' },
        { field: 'created_at', name: 'created_at', header: '時間' },
        { field: 'ip', name: 'ip', header: 'IP位置' },
        { field: 'lang_name', name: 'lang_name', header: '語系' },
      ],
      perPage: 10,
      dataSource: searchLogList.data,
      total: searchLogList.total,
      selectedRow: undefined,
      setSeletedRow: undefined,
      handleChangePage: jest.fn(),
      handleChangePerPage: jest.fn(),
      currentPage: 1,
    };

    beforeEach(() => render(<TableField {...props} />));

    // FIXME: 換頁功能應該要通過測試
    // it('should focus on page 4 after clicking', async () => {
    //   const page4Button = screen.queryByTitle('4') as HTMLButtonElement;
    //   expect(page4Button).toBeInTheDocument();
    //   await userEvent.click(page4Button);
    //   expect(page4Button).toHaveClass('ant-pagination-item-active');
    // });

    it('should have 11 rows and last page = 42, first page = 1 after clicking page 4 and page 42', async () => {
      const rows = screen.queryAllByRole('row');
      expect(rows).toHaveLength(11);
      const firstPageButton = screen.queryByTitle('1') as HTMLButtonElement;
      const lastPageButton = screen.queryByTitle('42') as HTMLButtonElement;
      expect(lastPageButton).toBeVisible();
      const page4Button = screen.queryByTitle('4') as HTMLButtonElement;
      await userEvent.click(page4Button);
      expect(firstPageButton).toBeVisible();
      expect(lastPageButton).toBeVisible();
    });

    it('should change to page 22 after typing 22 and press enter', async () => {
      const input = screen.queryByLabelText('Page') as HTMLInputElement;
      expect(input).toBeVisible();

      const page4Button = screen.queryByTitle('4') as HTMLButtonElement;
      expect(page4Button).toBeVisible();
      await userEvent.click(page4Button);

      await userEvent.clear(input);
      await userEvent.type(input, '22');
      await userEvent.type(input, '{enter}');
      expect(input).toHaveValue('22');
      // FIXME: 應該要有才對
      // const page22Button = screen.queryByTitle('22') as HTMLButtonElement;
      // expect(page22Button).toBeVisible();
      const firstPageButton = screen.queryByText('1') as HTMLButtonElement;
      const lastPageButton = screen.queryByText('42') as HTMLButtonElement;
      expect(firstPageButton).toBeVisible();
      expect(lastPageButton).toBeVisible();
    });

    it.todo('should change back to page 1 after changing page size');
  });
});

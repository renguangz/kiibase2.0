import { render, screen } from '@testing-library/react';
import { TableField, TableFieldProps } from '.';
import bannerList from '@/src/mock/db/utils/ContentList/banner/initList.json';

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/test',
  }),
}));

const generateDataSource = (length: number, columns: { field: string }[], arr: any[]): Array<any> => {
  if (length < 1) return arr;
  const result = columns.reduce((acc, cur) => {
    return { ...acc, [cur.field]: `value-${cur.field}-${length}` };
  }, {});
  return generateDataSource(length - 1, columns, [...arr, result]);
};

describe('TableField', () => {
  const setup = (props: TableFieldProps) => {
    render(<TableField {...props} />);
  };

  it('should have 3 columns and 10 rows', () => {
    const expectTheads = ['col1', 'col2', 'col3'];
    const columns = expectTheads.map((thead) => ({ field: `field-${thead}`, name: '', header: thead }));
    const dataSource = generateDataSource(11, columns, []);
    setup({
      columns,
      dataSource,
      total: 0,
      selectedRow: undefined,
      setSeletedRow: undefined,
    });

    const theads = document.querySelectorAll('.p-column-title');
    expect(theads).toHaveLength(3);
    theads.forEach((thead, index) => {
      expect(thead.innerHTML).toEqual(expectTheads[index]);
    });

    const bodyTr = document.querySelectorAll('tbody tr');
    expect(bodyTr).toHaveLength(10);
  });

  describe('Banner', () => {
    const props: TableFieldProps = {
      columns: [
        { field: undefined, name: '__checkbox', header: undefined },
        { field: 'id', name: 'id', header: 'ID' },
        { field: 'title', name: 'title', header: '標題' },
        { field: 'pic', name: '__component:list-image', header: '封面圖' },
        { field: 'device', name: 'device_name', header: '所在位置' },
        { field: 'status', name: '__component:list-select', header: '狀態' },
        { field: 'order', name: '__component:list-input', header: '權重' },
        { field: undefined, name: '__slot:actions', header: '操作' },
      ],
      dataSource: bannerList.data,
      total: bannerList.total,
      selectedRow: undefined,
      setSeletedRow: undefined,
    };

    beforeEach(() => render(<TableField {...props} />));

    it('should have 5 images display', async () => {
      const images = screen.queryAllByRole('img');
      expect(images).toHaveLength(bannerList.total);
    });

    it('should have edit link', async () => {
      const links = screen.queryAllByRole('link') as HTMLLinkElement[];
      expect(links).toHaveLength(5);

      links.forEach((link, index) => {
        expect(link.href).toContain(`/test/${bannerList.data[index].id}/edit`);
      });
    });
  });

  it.todo('can sort data');
  it.todo('can do actions on row');
  it.todo('can select rows');
});

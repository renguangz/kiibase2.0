import { render, screen } from '@testing-library/react';
import { TableField, TableFieldProps } from '.';

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

const generateDataSource = (length: number, columns: { field: string }[], arr: any[]): Array<any> => {
  if (length < 1) return arr;
  const result = columns.reduce((acc, cur) => {
    return { ...acc, [cur.field]: `value-${cur.field}-${length}` };
  }, {});
  return generateDataSource(length - 1, columns, [...arr, result]);
};

describe('TableField', () => {
  const setup = (props: TableFieldProps<any>) => {
    render(<TableField {...props} />);
  };

  it('should have 3 columns and 10 rows', () => {
    const expectTheads = ['col1', 'col2', 'col3'];
    const columns = expectTheads.map((thead) => ({ field: `field-${thead}`, header: thead }));
    const dataSource = generateDataSource(11, columns, []);
    setup({ columns, dataSource, total: 0 });

    const theads = document.querySelectorAll('.p-column-title');
    expect(theads).toHaveLength(3);
    theads.forEach((thead, index) => {
      expect(thead.innerHTML).toEqual(expectTheads[index]);
    });

    const bodyTr = document.querySelectorAll('tbody tr');
    expect(bodyTr).toHaveLength(10);
  });

  it.todo('can sort data');
  it.todo('can do actions on row');
  it.todo('can select rows');
});

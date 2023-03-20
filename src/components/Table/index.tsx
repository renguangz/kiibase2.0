import { SPACES } from '@/src/utils';
import { Form, Table } from 'antd';

/*
const tableProps: TableProps<DataType> = {
  bordered,
  loading,
  size,
  expandable,
  title: showTitle ? defaultTitle : undefined,
  showHeader,
  footer: showfooter ? defaultFooter : undefined,
  rowSelection,
  scroll,
  tableLayout,
  dataSource={[]}
  columns={[]}
  pagination={{ position: ['bottomRight'] }}
};
*/

type TableFieldProps<C> = {
  columns: Array<C>;
  dataSource: any[];
};

export function TableField<C>({ columns, dataSource }: TableFieldProps<C>) {
  return (
    <Form style={{ width: '100%', paddingTop: SPACES['space-24'] }}>
      <Table
        style={{ minHeight: '60vh', width: '100%' }}
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ['bottomRight'] }}
      />
    </Form>
  );
}

import { SPACES } from '@/src/utils';
import { Form } from 'antd';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export type TableFieldProps<C> = {
  columns: Array<C>;
  dataSource: any[];
  total: number;
};

export function TableField<C>({ columns, dataSource, total }: TableFieldProps<C>) {
  return (
    <Form style={{ width: '100%', paddingTop: SPACES['space-24'] }}>
      <DataTable value={dataSource} rows={10} rowsPerPageOptions={[10, 20, 50]} paginator>
        {columns.map((column: any) => (
          <Column key={`column-${Math.random()}`} {...column} />
        ))}
      </DataTable>
    </Form>
  );
}

import { combineApiUrl, SPACES } from '@/src/utils';
import { Form } from 'antd';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Field = {
  field?: string;
  name: string;
  header?: string;
};

type IsImageColumn = (field: Field) => boolean;
const isImageColumn: IsImageColumn = (field) => field.name === '__component:list-image';

type IsRowEditor = (field: Field) => boolean;
const isRowEditor: IsRowEditor = (field) => field.name === '__slot:actions';

export type TableFieldProps = {
  columns: Array<Field>;
  dataSource: any[];
  total: number;
};

export function TableField({ columns, dataSource, total }: TableFieldProps) {
  const displayColumns = useMemo(
    () =>
      columns.map((column) =>
        isImageColumn(column)
          ? { ...column, body: fullImageColumnTemplate }
          : isRowEditor(column)
          ? {
              ...column,
              body: editColumnTemplate,
            }
          : column,
      ),
    [columns, isImageColumn, fullImageColumnTemplate],
  );

  return (
    <Form style={{ width: '100%', paddingTop: SPACES['space-24'] }}>
      <DataTable value={dataSource} rows={10} rowsPerPageOptions={[10, 20, 50]} paginator selectionMode="checkbox">
        {displayColumns.map((column: any) => (
          <Column key={`column-${Math.random()}`} {...column} />
        ))}
      </DataTable>
    </Form>
  );
}

function fullImageColumnTemplate(data: { pic: string }) {
  const srcUrl = useMemo(() => `http://localhost:2108/storage/${data.pic}`, [combineApiUrl, data]);
  return (
    <div>
      <img src={srcUrl} alt={srcUrl} role="img" width={200} height={150} />
    </div>
  );
}

function editColumnTemplate(data: { id: string | number }) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <div>
      <Link href={`${asPath}/${data.id}/edit`} role="link">
        edit button
      </Link>
    </div>
  );
}

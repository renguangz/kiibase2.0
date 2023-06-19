import { combineStorageUrl, SPACES } from '@/src/utils';
import { Form, Pagination } from 'antd';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { Column } from 'primereact/column';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { InputTextField } from '../FilterField/enhanceFilterField/InputTextField';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

type Field = {
  field?: string;
  name: string;
  header?: string;
};

type IsCheckboxColumn = (field: Field) => boolean;
const isCheckboxColumn: IsCheckboxColumn = (field) => field.name === '__checkbox';

type IsImageColumn = (field: Field) => boolean;
const isImageColumn: IsImageColumn = (field) => field.name === 'list-image';

type IsRowEditor = (field: Field) => boolean;
const isRowEditor: IsRowEditor = (field) => field.name === '__slot:actions';

type IsStatusColumn = (field: Field) => boolean;
const isStatusColumn: IsStatusColumn = (field) => field.name === 'status';

type IsInputColumn = (field: Field) => boolean;
const isInputColumn: IsInputColumn = (field) => field.name === '__component:list-input';

export type TableFieldProps = {
  perPage: number;
  columns: Array<Field>;
  dataSource: any[];
  total: number;
  selectedRow: any;
  setSeletedRow: any;
  currentPage: number;
  handleChangePage: (currentPage: number) => void;
  handleChangePerPage: (pageSize: number) => void;
};

export function TableField({
  perPage,
  columns,
  dataSource,
  total,
  selectedRow,
  setSeletedRow,
  currentPage,
  handleChangePage,
  handleChangePerPage,
}: TableFieldProps) {
  const form = useForm();

  const displayColumns = useMemo(
    () =>
      columns.map((column) =>
        isImageColumn(column)
          ? { ...column, body: fullImageColumnTemplate(column) }
          : isRowEditor(column)
          ? {
              ...column,
              body: editColumnTemplate,
            }
          : isStatusColumn(column)
          ? { ...column, body: statusTemplate(column) }
          : isInputColumn(column)
          ? {
              ...column,
              body: inputTemplate(column, form, column.field?.includes('number') ?? false),
            }
          : column,
      ),
    [
      columns,
      isImageColumn,
      fullImageColumnTemplate,
      isRowEditor,
      editColumnTemplate,
      isStatusColumn,
      statusTemplate,
      isInputColumn,
    ],
  );

  const [page, setPage] = useState(currentPage);
  const [pageSize, setPageSize] = useState(perPage);
  const onChange = useCallback(
    (current: number, size: number) => {
      if (current !== page) {
        handleChangePage(current);
        setPage(current);
      }
      if (size !== pageSize) {
        handleChangePerPage(size);
        setPageSize(size);
      }
    },
    [page, setPage, handleChangePage, pageSize, setPageSize, handleChangePerPage],
  );

  return (
    <Form style={{ width: '100%', paddingTop: SPACES['space-24'] }}>
      <DataTable
        value={dataSource}
        rows={perPage}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedRow}
        onSelectionChange={(e) => setSeletedRow(e.value)}
      >
        {displayColumns.map((column) =>
          isCheckboxColumn(column) ? checkboxColumnTemplate() : <Column key={`column-${Math.random()}`} {...column} />,
        )}
      </DataTable>
      <Pagination
        showQuickJumper
        current={currentPage}
        defaultCurrent={2}
        total={total}
        hideOnSinglePage
        onChange={onChange}
      />
    </Form>
  );
}

function checkboxColumnTemplate() {
  return <Column key={`checkbox-column-${Math.random()}`} selectionMode="multiple" headerStyle={{ width: '3rem' }} />;
}

function fullImageColumnTemplate(column: Field) {
  return (data: any) => {
    const imgData = useMemo(() => (column.field ? data[column.field] : null), [column, data]);
    const srcUrl = useMemo(() => `${combineStorageUrl('')}/${imgData}`, [combineStorageUrl, imgData]);

    return (
      <div>
        <img src={srcUrl} alt={srcUrl} role="img" width={200} height={150} />
      </div>
    );
  };
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

export type StatusType = 'success' | 'danger' | 'warning' | undefined;

function statusTemplate(column: Field) {
  return (data: any) => {
    const tagData: { value: string; status: StatusType } | null = useMemo(
      () => (column.field ? data[column.field] : null),
      [column, data],
    );

    return <Tag role={'status'} value={tagData?.value ?? ''} severity={tagData?.status ?? undefined} />;
  };
}

function inputTemplate(column: Field, form: UseFormReturn<FieldValues, any>, isNumberInput: boolean) {
  return (data: any) => {
    useEffect(() => {
      form.setValue(`${column.field}-${data.id}`, data[column.field ?? '']);
    }, []);

    return (
      <InputTextField
        inputType={isNumberInput ? 'number' : undefined}
        form={form}
        name={`${column.field}-${data.id}`}
        required={false}
        defaultValue={data[column.field ?? ''] ?? ''}
      />
    );
  };
}

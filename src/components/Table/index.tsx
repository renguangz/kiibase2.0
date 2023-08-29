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
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { SelectField } from '../FilterField/enhanceFilterField/SelectField';
import styled from 'styled-components';
import { StyledButton } from '../common';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

type Field = {
  field?: string;
  name: string;
  header?: string;
  options?: Array<Record<'key' | 'value', string>>;
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

type IsSelectColumn = (field: Field) => boolean;
const isSelectColumn: IsSelectColumn = (field) => field.name === '__component:list-select';

export type TableFieldProps = {
  form: UseFormReturn<FieldValues, any>;
  perPage: number;
  columns: Array<Field>;
  dataSource: any[];
  total: number;
  selectedRow: any;
  setSeletedRow: any;
  currentPage: number;
  handleChangePage: (currentPage: number) => void;
  handleChangePerPage: (pageSize: number) => void;
  handleDeleteModelList?: (id: string | number) => void;
};

export function TableField({
  form,
  perPage,
  columns,
  dataSource,
  total,
  selectedRow,
  setSeletedRow,
  currentPage,
  handleChangePage,
  handleChangePerPage,
  handleDeleteModelList,
}: TableFieldProps) {
  const displayColumns = useMemo(
    () =>
      columns.map((column) =>
        isImageColumn(column)
          ? { ...column, body: fullImageColumnTemplate(column) }
          : isRowEditor(column)
          ? {
              ...column,
              body: editColumnTemplate(handleDeleteModelList ? handleDeleteModelList : () => {}),
            }
          : isStatusColumn(column)
          ? { ...column, body: statusTemplate(column) }
          : isInputColumn(column)
          ? {
              ...column,
              body: inputTemplate(column, form, column.field?.includes('number') ?? false),
            }
          : isSelectColumn(column)
          ? {
              ...column,
              body: selectTemplate(column, form),
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
      inputTemplate,
      isSelectColumn,
      selectTemplate,
      handleDeleteModelList,
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
      <ConfirmDialog />
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

const EditColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  width: 115px;
`;

function editColumnTemplate(handleDelete: (id: string | number) => void) {
  return (data: { id: string | number }) => {
    const router = useRouter();
    const { asPath } = router;

    const confirm2 = () => {
      confirmDialog({
        header: '確定要刪除嗎',
        acceptClassName: 'p-button-danger',
        rejectLabel: '取消',
        acceptLabel: '確定',
        accept: () => handleDelete(data.id),
      });
    };

    return (
      <EditColumnWrapper>
        <StyledButton type="button" color="primary">
          <Link href={`${asPath}/${data.id}/edit`} role="link" style={{ color: '#fff' }}>
            編輯
          </Link>
        </StyledButton>
        <StyledButton type="button" color="danger" variant="outline" onClick={confirm2}>
          刪除
        </StyledButton>
      </EditColumnWrapper>
    );
  };
}

// function editColumnTemplate(data: { id: string | number }) {
//   const router = useRouter();
//   const { asPath } = router;
//
//   const confirm2 = () => {
//     confirmDialog({
//       header: '確定要刪除嗎',
//       acceptClassName: 'p-button-danger',
//       rejectLabel: '取消',
//       acceptLabel: '確定',
//     });
//   };
//
//   return (
//     <EditColumnWrapper>
//       <StyledButton type="button" color="primary">
//         <Link href={`${asPath}/${data.id}/edit`} role="link" style={{ color: '#fff' }}>
//           編輯
//         </Link>
//       </StyledButton>
//       <StyledButton type="button" color="danger" variant="outline" onClick={confirm2}>
//         刪除
//       </StyledButton>
//     </EditColumnWrapper>
//   );
// }

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

function selectTemplate(column: Field, form: UseFormReturn<FieldValues, any>) {
  return (data: any) => {
    const options = useMemo(
      () => column.options?.map((option) => ({ value: option.key, label: option.value })) ?? [],
      [column],
    );

    useEffect(() => {
      form.setValue(`${column.field}-${data.id}`, data[column.field ?? '']);
    }, []);

    return (
      <SelectField
        form={form}
        options={options}
        defaultValue={'下架'}
        required={false}
        name={`${column.field}-${data.id}`}
      />
    );
  };
}

import { SPACES } from '@/utils';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { Column } from 'primereact/column';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { InputTextField } from '../FilterField/enhanceFilterField/InputTextField';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { SelectField } from '../FilterField/enhanceFilterField/SelectField';
import styled from 'styled-components';
import { StyledButton } from '../common';
import { confirmDialog } from 'primereact/confirmdialog';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const PaginatorWrapper = styled.div`
  margin-top: 27px;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 9px;
`;

export const PageInfo = styled.span`
  color: #6c757d;
  text-align: right;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
`;

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
const isInputColumn: IsInputColumn = (field) =>
  field.name === '__component:list-input' || field.name === '__component:list-input_number';

type IsSelectColumn = (field: Field) => boolean;
const isSelectColumn: IsSelectColumn = (field) => field.name === '__component:list-select';

export type TableFieldProps = {
  queryParams: Record<string, any>;
  form: UseFormReturn<FieldValues, any>;
  // perPage: number;
  columns: Array<Field>;
  dataSource: any[];
  total: number;
  selectedRow: any;
  setSeletedRow: any;
  // currentPage: number;
  cannotDelete?: boolean;
  // handleChangePage: (currentPage: number) => void;
  // handleChangePerPage: (pageSize: number) => void;
  handleDeleteModelList?: (id: string | number) => void;
  onPageChange: (event: PaginatorPageChangeEvent) => void;
};

export function TableField({
  queryParams,
  form,
  // perPage,
  columns,
  dataSource,
  total,
  selectedRow,
  setSeletedRow,
  // currentPage,
  cannotDelete,
  // handleChangePage,
  // handleChangePerPage,
  handleDeleteModelList,
  onPageChange,
}: TableFieldProps) {
  const displayColumns = useMemo(
    () =>
      columns.map((column) =>
        isImageColumn(column)
          ? { ...column, body: fullImageColumnTemplate(column) }
          : isRowEditor(column)
          ? {
              ...column,
              body: editColumnTemplate(handleDeleteModelList ? handleDeleteModelList : () => {}, cannotDelete),
            }
          : isStatusColumn(column)
          ? { ...column, body: statusTemplate(column) }
          : isInputColumn(column)
          ? {
              ...column,
              body: inputTemplate(column, form, column.name.includes('number') ?? false),
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
      dataSource,
    ],
  );

  return (
    <form style={{ width: '100%', paddingTop: SPACES['space-24'] }}>
      <DataTable
        style={{ fontSize: 14 }}
        value={dataSource}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedRow}
        onSelectionChange={(e) => setSeletedRow(e.value)}
      >
        {displayColumns.map((column, index) =>
          isCheckboxColumn(column) ? (
            checkboxColumnTemplate()
          ) : (
            <Column key={`column-${column.name}-${index}`} {...column} />
          ),
        )}
      </DataTable>
      <PaginatorWrapper>
        <PageInfo>
          目前顯示 {(queryParams['page'] - 1) * 10 + 1} -{' '}
          {queryParams['page'] * queryParams['per_page'] > total
            ? total
            : queryParams['page'] * queryParams['per_page']}{' '}
          筆資料，共 {total} 筆資料
        </PageInfo>
        <Paginator
          first={(queryParams['page'] - 1) * queryParams['per_page']}
          rows={queryParams['per_page']}
          totalRecords={total}
          onPageChange={onPageChange}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </PaginatorWrapper>
    </form>
  );
}

function checkboxColumnTemplate() {
  return <Column key={`checkbox-column-${Math.random()}`} selectionMode="multiple" headerStyle={{ width: '3rem' }} />;
}

function fullImageColumnTemplate(column: Field) {
  return function FullImageColumnTemplate(data: any) {
    const imgData = useMemo(() => (column.field ? data[column.field] : null), [column, data]);

    return (
      <div>
        <img src={imgData} alt={imgData} role="img" width={200} height={150} style={{ maxWidth: 100, maxHeight: 75 }} />
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

function editColumnTemplate(handleDelete: (id: string | number) => void, cannotDelete?: boolean) {
  return function EditColumnTemplate(data: { id: string | number }) {
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
        <StyledButton onClick={() => router.push(`${asPath}/${data.id}/edit`)} type="button" color="primary">
          編輯
        </StyledButton>
        {cannotDelete ? null : (
          <StyledButton type="button" color="danger" variant="outline" onClick={confirm2}>
            刪除
          </StyledButton>
        )}
      </EditColumnWrapper>
    );
  };
}

export type StatusType = 'success' | 'danger' | 'warning' | undefined;

function statusTemplate(column: Field) {
  return function StatusTemplate(data: any) {
    const tagData: { value: string; status: StatusType } | null = useMemo(
      () => (column.field ? data[column.field] : null),
      [column, data],
    );

    return <Tag role={'status'} value={tagData?.value ?? ''} severity={tagData?.status ?? undefined} />;
  };
}

function inputTemplate(column: Field, form: UseFormReturn<FieldValues, any>, isNumberInput: boolean) {
  return function InputeTemplate(data: any) {
    useEffect(() => {
      form.setValue(`${column.field}-${data.id}`, data[column.field ?? '']);
    }, [data]);

    return (
      <InputTextField
        width={100}
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
  return function SelectTemplate(data: any) {
    const options = useMemo(
      () => column.options?.map((option) => ({ value: option.key, label: option.value })) ?? [],
      [column],
    );

    useEffect(() => {
      form.setValue(`${column.field}-${data.id}`, data[column.field ?? '']);
    }, [data]);

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

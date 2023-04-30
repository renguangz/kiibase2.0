import { combineStorageUrl, SPACES } from '@/src/utils';
import { Form } from 'antd';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Paginator, PaginatorCurrentPageReportOptions } from 'primereact/paginator';
import React from 'react';
import { Ripple } from 'primereact/ripple';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

type Field = {
  field?: string;
  name: string;
  header?: string;
};

type IsCheckboxColumn = (field: Field) => boolean;
const isCheckboxColumn: IsCheckboxColumn = (field) => field.name === '__checkbox';

type IsImageColumn = (field: Field) => boolean;
const isImageColumn: IsImageColumn = (field) => field.name === '__component:list-image';

type IsRowEditor = (field: Field) => boolean;
const isRowEditor: IsRowEditor = (field) => field.name === '__slot:actions';

export type TableFieldProps = {
  perPage: number;
  columns: Array<Field>;
  dataSource: any[];
  total: number;
  selectedRow: any;
  setSeletedRow: any;
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
  handleChangePage,
  handleChangePerPage,
}: TableFieldProps) {
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
      <TablePaginator
        perPage={perPage}
        total={total}
        handleChangePage={handleChangePage}
        handleChangePerPage={handleChangePerPage}
      />
    </Form>
  );
}

function checkboxColumnTemplate() {
  return <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />;
}

function fullImageColumnTemplate(data: { pic: string }) {
  const srcUrl = useMemo(() => `${combineStorageUrl('')}/${data.pic}`, [combineStorageUrl, data]);
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

type TablePaginatorProps = Pick<TableFieldProps, 'perPage' | 'handleChangePage' | 'handleChangePerPage' | 'total'>;

const TablePaginator = ({ perPage, total, handleChangePage, handleChangePerPage }: TablePaginatorProps) => {
  const [first, setFirst] = useState<number[]>([0, 0, 0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInputTooltip, setPageInputTooltip] = useState<string>("Press 'Enter' key to go to this page.");

  const onPageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(event.target.value));
  };

  const onPageInputKeyDown = (
    event: React.KeydownEvent<HTMLInputElement>,
    options: PaginatorCurrentPageReportOptions,
  ) => {
    if (event.key === 'Enter') {
      const page = parseInt(`${currentPage}`);

      if (page < 0 || page > options.totalPages) {
        setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
      } else {
        let _first = [...first];

        _first[0] = currentPage ? options.rows * (page - 1) : 0;

        setFirst(_first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const paginatorTemplate = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    PrevPageLink: (options: any) => {
      return (
        <button
          type="button"
          className={classNames(options.className, 'border-round')}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options: {
      className: any;
      onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
      disabled: boolean | undefined;
    }) => {
      return (
        <button
          type="button"
          className={classNames(options.className, 'border-round')}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options: {
      view: { startPage: number; endPage: any };
      page: number;
      totalPages: any;
      className: string | undefined;
      onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    }) => {
      if (
        (options.view.startPage === options.page && options.view.startPage !== 0) ||
        (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { 'p-disabled': true });

        return (
          <span className={className} style={{ userSelect: 'none' }}>
            ...
          </span>
        );
      }

      return (
        <button type="button" className={options.className} onClick={() => handleChangePage(options.page + 1)}>
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options: {
      totalRecords: any;
      value: any;
      onChange: ((event: DropdownChangeEvent) => void) | undefined;
    }) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ];

      return (
        <Dropdown value={options.value} options={dropdownOptions} onChange={(e) => handleChangePerPage(e.value)} />
      );
    },
    CurrentPageReport: (options: any) => {
      return (
        <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
          Go to{' '}
          <InputText
            size={2}
            className="ml-1"
            value={`${currentPage}`}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };
  return <Paginator template={paginatorTemplate} first={first[0]} totalRecords={total} rows={perPage} />;
};

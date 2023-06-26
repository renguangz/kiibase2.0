import { StyledButton } from '@/src/components/common';
import { ContentHeader } from '@/src/components/Content';
import { FilterField } from '@/src/components/FilterField';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { COLORS } from '@/src/utils';
import { useContentList, useFilterField, useGetConfig } from '@/src/utils/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useEffect } from 'react';
import styled from 'styled-components';

const FilterFieldWrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLORS.lightGray};
`;

export default function ContentListPage() {
  const router = useRouter();
  const { asPath } = router;

  const { data, columns, canUpdate } = useGetConfig(asPath);

  const {
    tableForm,
    updateButtonDisabled,
    data: contentData,
    total: contentDataTotal,
    queryParams,
    setQueryParams,
    handleChangePage,
    handleChangePerPage,
    handleUpdateList,
    handleDeleteModel,
    mutate,
  } = useContentList(asPath);

  const {
    form,
    data: filterData,
    handleSearch,
    selectedRow,
    setSelectedRow,
    disableListDeleteButton,
    handleDeleteAll,
  } = useFilterField(asPath, setQueryParams, mutate);

  const confirm = (type: 'DELETE' | 'UPDATE') => {
    confirmDialog({
      header: type === 'DELETE' ? '確定要刪除嗎' : '確定要更新嗎',
      acceptClassName: 'p-button-danger',
      rejectLabel: '取消',
      acceptLabel: '確定',
      accept: type === 'DELETE' ? () => handleDeleteAll() : () => handleUpdateList(),
    });
  };

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <PageLayout>
      <ConfirmDialog />
      <ContentHeader
        text={`${data?.topic}列表`}
        button={data?.create_button && <Link href={`${asPath}/create`}>建立新的{data.topic}</Link>}
      />
      <FilterFieldWrapper>
        <FilterField
          form={form}
          onSubmit={handleSearch}
          filters={filterData}
          updateButton={() =>
            canUpdate ? (
              <StyledButton
                type="button"
                color="warning"
                variant="outline"
                disabled={updateButtonDisabled}
                onClick={() => confirm('UPDATE')}
              >
                批次更新
              </StyledButton>
            ) : null
          }
          deleteButton={() =>
            data?.delete_button ? (
              <StyledButton
                type="button"
                color="danger"
                variant="outline"
                disabled={disableListDeleteButton}
                onClick={() => confirm('DELETE')}
              >
                批次刪除
              </StyledButton>
            ) : null
          }
        />
      </FilterFieldWrapper>
      <TableField
        form={tableForm}
        currentPage={queryParams['page']}
        handleChangePage={handleChangePage}
        handleChangePerPage={handleChangePerPage}
        perPage={queryParams['per_page']}
        selectedRow={selectedRow}
        setSeletedRow={setSelectedRow}
        columns={columns ?? []}
        dataSource={contentData ?? []}
        total={contentDataTotal ?? 0}
        handleDeleteModelList={handleDeleteModel}
      />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

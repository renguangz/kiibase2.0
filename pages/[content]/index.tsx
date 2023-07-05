import { StyledButton } from '@/src/components/common';
import { ContentHeader } from '@/src/components/Content';
import { FilterField } from '@/src/components/FilterField';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { COLORS } from '@/src/utils';
import { useContentList, useFilterField, useGetConfig } from '@/src/utils/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { StyledLink } from './create';

const FilterFieldWrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLORS.lightGray};
`;

export default function ContentListPage() {
  const router = useRouter();
  const { asPath, push } = router;

  const { data, columns, canUpdate } = useGetConfig(asPath);

  const {
    tableForm,
    updateButtonDisabled,
    data: contentData,
    total: contentDataTotal,
    queryParams,
    setQueryParams,
    resetQueryParams,
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
    const handleRouteChange = () => {
      resetQueryParams();
      tableForm.reset();
      form.reset();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [tableForm.reset, form.reset, router.events, resetQueryParams]);

  useLayoutEffect(() => {
    if (data?.is_single_data) {
      push(`${asPath}/${data?.single_data_id ?? 1}/edit`);
    }
  }, [data, asPath]);

  return (
    <PageLayout key={asPath}>
      <ConfirmDialog />
      <ContentHeader
        text={`${data?.topic}列表`}
        button={
          data?.create_button && (
            <StyledButton variant="outline">
              <StyledLink href={`${asPath}/create`}>建立新的{data.topic}</StyledLink>
            </StyledButton>
          )
        }
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
        cannotDelete={!data?.delete_button}
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

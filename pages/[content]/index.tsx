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
import { useEffect } from 'react';
import styled from 'styled-components';

const FilterFieldWrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLORS.lightGray};
`;

export default function ContentListPage() {
  const router = useRouter();
  const { asPath } = router;

  const { data, columns } = useGetConfig(asPath);
  const {
    data: contentData,
    total: contentDataTotal,
    queryParams,
    setQueryParams,
    handleChangePage,
    handleChangePerPage,
  } = useContentList(asPath);
  const {
    form,
    data: filterData,
    handleSearch,
    selectedRow,
    setSelectedRow,
    disableListDeleteButton,
    handleDeleteAll,
  } = useFilterField(asPath, setQueryParams);

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <PageLayout>
      <ContentHeader
        text={`${data?.topic}列表`}
        button={data?.create_button && <Link href={`${asPath}/create`}>建立新的{data.topic}</Link>}
      />
      <FilterFieldWrapper>
        <FilterField
          form={form}
          onSubmit={handleSearch}
          filters={filterData}
          deleteButton={() =>
            data?.delete_button ? (
              <StyledButton
                type="button"
                color="danger"
                variant="outline"
                disabled={disableListDeleteButton}
                onClick={handleDeleteAll}
              >
                刪除
              </StyledButton>
            ) : null
          }
        />
      </FilterFieldWrapper>
      <TableField
        currentPage={queryParams['page']}
        handleChangePage={handleChangePage}
        handleChangePerPage={handleChangePerPage}
        perPage={queryParams['per_page']}
        selectedRow={selectedRow}
        setSeletedRow={setSelectedRow}
        columns={columns ?? []}
        dataSource={contentData ?? []}
        total={contentDataTotal ?? 0}
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

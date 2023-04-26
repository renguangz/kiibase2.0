import { ContentHeader } from '@/src/components/Content';
import { FilterField } from '@/src/components/FilterField';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { useContentList, useFilterField, useGetConfig } from '@/src/utils/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ContentListPage() {
  const router = useRouter();
  const { asPath } = router;

  const { data, columns } = useGetConfig(asPath);
  const { data: contentData, total: contentDataTotal, setQueryParams } = useContentList(asPath);
  const { form, data: filterData, handleSearch } = useFilterField(asPath, setQueryParams);

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <PageLayout>
      <ContentHeader
        text={`${data?.topic}列表`}
        button={data?.canBeCreate && <Link href={`${asPath}/create`}>建立新的{data.topic}</Link>}
      />
      <div>
        <FilterField form={form} onSubmit={handleSearch} filters={filterData} />
        {data?.canBeDelete && (
          <button type="button" disabled>
            刪除
          </button>
        )}
      </div>
      <TableField columns={columns ?? []} dataSource={contentData ?? []} total={contentDataTotal ?? 0} />
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

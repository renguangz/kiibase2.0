import { ContentHeader } from '@/src/components/Content';
import { FilterField } from '@/src/components/FilterField';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { useContentList, useFilterField, useGetConfig } from '@/src/utils/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function ContentListPage() {
  const router = useRouter();
  const { asPath } = router;

  const { form, data: filterData } = useFilterField(asPath);
  const { data, columns } = useGetConfig(asPath);
  const { data: contentData, total: contentDataTotal } = useContentList(asPath);

  return (
    <PageLayout>
      <ContentHeader text={`${data?.topic}列表`} button={data?.canBeCreate && <button>建立新的{data.topic}</button>} />
      <div>
        <FilterField form={form} onSubmit={() => {}} filters={filterData} />
        <button type="button" disabled>
          刪除
        </button>
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

import { ContentHeader } from '@/src/components/Content';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { useContentList, useGetConfig } from '@/src/utils/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function ContentListPage() {
  const router = useRouter();
  const { asPath } = router;

  const { data } = useGetConfig(asPath);
  const {} = useContentList(asPath);

  return (
    <PageLayout>
      <ContentHeader text={`${data?.topic}列表`} button={data?.canBeCreate && <button>建立新的{data.topic}</button>} />
      <div>filters</div>
      <TableField columns={data?.list ?? []} dataSource={[]} />
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

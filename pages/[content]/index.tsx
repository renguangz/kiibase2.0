import { ContentHeader } from '@/src/components/Content';
import { PageLayout } from '@/src/layouts';
import { useGetConfig } from '@/src/utils/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function ContentListPage() {
  const router = useRouter();
  const { asPath } = router;

  const { data } = useGetConfig(asPath);
  console.log(data);

  return (
    <PageLayout>
      <ContentHeader text={`${data?.topic}列表`} button={data?.canBeCreate && <button>建立新的{data.topic}</button>} />
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

import { ContentHeader } from '@/src/components/Content';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CreateContentPage() {
  const router = useRouter();
  const { asPath } = router;

  const { data: createConfigData } = useCreateContent(asPath);

  return (
    <div>
      <ContentHeader
        text={`${createConfigData?.topic}建立`}
        button={<Link href={`/${createConfigData?.routes}`}>{createConfigData?.topic}列表</Link>}
      />
      <button type="button">確定</button>
    </div>
  );
}

import { ContentUpdateField } from '@/src/components';
import { ContentHeader } from '@/src/components/Content';
import { useEditContent } from '@/src/utils/hooks';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import Link from 'next/link';
import { useRouter } from 'next/router';

const faketitle = '首頁底圖';
export default function EditContentPage() {
  const router = useRouter();
  const { asPath } = router;

  const { fieldsData } = useCreateContent(asPath);
  const { form } = useEditContent(asPath);

  return (
    <div>
      <ContentHeader
        text={`${faketitle}修改`}
        button={
          <div>
            <Link href="/">{faketitle}列表</Link>
            <button type="button">刪除{faketitle}</button>
          </div>
        }
      />
      <ContentUpdateField form={form} fields={fieldsData ?? []} />
    </div>
  );
}

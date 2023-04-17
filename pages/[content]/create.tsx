import { ContentUpdateField } from '@/src/components';
import { ContentHeader } from '@/src/components/Content';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function CreateContentPage() {
  const router = useRouter();
  const { asPath } = router;
  const form = useForm();

  const { data: createConfigData, fieldsData, isSubmitButtonDisabled } = useCreateContent(asPath, form);

  return (
    <div>
      <ContentHeader
        text={`${createConfigData?.topic ?? ''}建立`}
        button={<Link href={`/${createConfigData?.routes}`}>{createConfigData?.topic}列表</Link>}
      />
      <ContentUpdateField form={form} fields={fieldsData ?? []} />
      <button type="button" disabled={isSubmitButtonDisabled}>
        確定
      </button>
    </div>
  );
}

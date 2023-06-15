import { ContentUpdateField } from '@/src/components';
import { ContentHeader } from '@/src/components/Content';
import { useCreateTestingPage } from '@/src/utils/hooks/testingPage';

export default function CreateTestingPage() {
  const { form, fieldsData } = useCreateTestingPage();

  return (
    <div>
      <ContentHeader text={`建立`} button={null} />
      <ContentUpdateField form={form} fields={fieldsData} />
      <button type="button" onClick={() => {}}>
        確定
      </button>
    </div>
  );
}

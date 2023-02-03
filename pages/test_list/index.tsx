import { Wrapper } from '@/src/components/common';
import { ContentHeader } from '@/src/components/Content';
import { InputField } from '@/src/components/FilterField';
import { PageLayout } from '@/src/layouts';

export default function TestListPage() {
  return (
    <PageLayout>
      <Wrapper height="auto">
        <ContentHeader text="TestListPage" button={<button>test button</button>} />
      </Wrapper>
      <InputField label="test page input" inputProps={{}} />
    </PageLayout>
  );
}

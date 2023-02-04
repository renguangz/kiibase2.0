import { Wrapper } from '@/src/components/common';
import { ContentHeader } from '@/src/components/Content';
import { InputField } from '@/src/components/FilterField';
import { withFilterField } from '@/src/components/FilterField/withFilterField';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { SPACES } from '@/src/utils';
import styled from 'styled-components';

const FilterWrapper = styled(Wrapper)`
  height: auto;
  gap: ${SPACES['space-24']}px;
`;

export default function TestListPage() {
  return (
    <PageLayout>
      <Wrapper height="auto">
        <ContentHeader text="TestListPage" button={<button>test button</button>} />
      </Wrapper>
      <FilterWrapper>
        <InputField label="test page input" inputProps={{}} />
        {withFilterField('Input')('searchInput')('enhanced')({})}
        {withFilterField('Select')('SelectField')('enhanced')({})}
      </FilterWrapper>
      <TableField />
    </PageLayout>
  );
}

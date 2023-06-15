import { ContentHeader } from '@/src/components/Content';
import { FilterField } from '@/src/components/FilterField';
import { TableField } from '@/src/components/Table';
import { PageLayout } from '@/src/layouts';
import { useTestingPageFilterField } from '@/src/utils/hooks/testingPage';

export default function TestingPage() {
  const { form, data: filterData, handleSearch } = useTestingPageFilterField();

  return (
    <PageLayout>
      <ContentHeader text={`列表`} />
      <div>
        <FilterField form={form} onSubmit={handleSearch} filters={filterData} />
      </div>
      <TableField
        currentPage={1}
        handleChangePage={() => {}}
        handleChangePerPage={() => {}}
        perPage={10}
        selectedRow={undefined}
        setSeletedRow={() => {}}
        columns={[]}
        dataSource={[]}
        total={0}
      />
    </PageLayout>
  );
}

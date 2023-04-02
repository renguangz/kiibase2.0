import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGetConfig } from '../useGetConfig';

export function useFilterField(asPath: string) {
  const form = useForm();

  const { data: configData } = useGetConfig(asPath);

  const tableSearch = useMemo(
    () => ({
      component: 'InputTextComponent',
      props: {
        label: 'table search title',
        name: 'tableSearch',
        required: false,
      },
    }),
    [],
  );

  const dateFilter = useMemo(() => configData?.date_filter ?? false, [configData]);

  const basicFilters = useMemo(
    () =>
      dateFilter
        ? [
            { component: 'CalendarComponent', props: { label: '起始日期', name: 'start_date', required: false } },
            { component: 'CalendarComponent', props: { label: '結束日期', name: 'end_date', required: false } },
            tableSearch,
          ]
        : [tableSearch],
    [dateFilter, tableSearch],
  );

  const filters = useMemo(
    () => (configData && configData.filter ? [...configData.filter, ...basicFilters] : []),
    [configData, basicFilters],
  );

  return {
    form,
    data: filters,
  };
}

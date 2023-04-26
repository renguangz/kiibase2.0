import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { formatObjectValueWithPlus } from '../../functions';
import { useGetConfig } from '../useGetConfig';

export function useFilterField(asPath: string, setQueryParams: Dispatch<SetStateAction<Record<string, any>>>) {
  const form = useForm();

  const { data: configData } = useGetConfig(asPath);

  const tableSearch = useMemo(
    () => ({
      component: 'InputTextComponent',
      props: {
        label: 'table search title',
        name: 'filter',
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

  const handleSearch = useCallback(() => {
    const formFields = formatObjectValueWithPlus(form.control._formValues);
    setQueryParams((query) => ({ ...query, ...formFields }));
  }, [form, setQueryParams, formatObjectValueWithPlus]);

  return {
    form,
    data: filters,
    handleSearch,
  };
}

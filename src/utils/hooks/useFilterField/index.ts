import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { combineApiUrl, pipeFormatObject } from '../../functions';
import { request, requestOptionsTemplate } from '../../request';
import { useGetConfig } from '../useGetConfig';

export function useFilterField(asPath: string, setQueryParams: Dispatch<SetStateAction<Record<string, any>>>) {
  const [selectedRow, setSelectedRow] = useState<Array<any> | null>(null);
  const form = useForm();

  const { data: configData } = useGetConfig(asPath);

  const deleteAllUrl = useMemo(() => `/model${asPath}/deleteList`, [asPath, combineApiUrl]);

  const disableListDeleteButton = useMemo(() => selectedRow === null || selectedRow.length === 0, [selectedRow]);

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

  const handleSearch = useCallback(() => {
    const formFields = pipeFormatObject(form.control._formValues);
    setQueryParams((query) => ({ ...query, page: 1, ...formFields }));
  }, [form, setQueryParams, pipeFormatObject]);

  const handleDeleteAll = useCallback(async () => {
    if (!selectedRow) return;
    const payload = selectedRow.map((row) => row.id);
    return await request(deleteAllUrl, requestOptionsTemplate('DELETE', payload));
  }, [request, requestOptionsTemplate, selectedRow, deleteAllUrl]);

  return {
    form,
    data: basicFilters,
    handleSearch,
    selectedRow,
    setSelectedRow,
    disableListDeleteButton,
    handleDeleteAll,
  };
}

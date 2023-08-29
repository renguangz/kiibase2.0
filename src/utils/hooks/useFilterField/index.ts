import { ApiDataType } from '@/src/types/data';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { combineApiUrl, pipeFormatObject } from '../../functions';
import { request, requestOptionsTemplate } from '../../request';
import { ContentDataType } from '../useContentList';
import { useGetConfig } from '../useGetConfig';

export function useFilterField(
  asPath: string,
  setQueryParams: Dispatch<SetStateAction<Record<string, any>>>,
  mutateContentList: KeyedMutator<ApiDataType<ContentDataType | undefined> | undefined>,
) {
  const [selectedRow, setSelectedRow] = useState<Array<any> | null>(null);
  const form = useForm();

  const { data: configData } = useGetConfig(asPath);

  const deleteAllUrl = useMemo(() => `/model${asPath}/deleteList`, [asPath, combineApiUrl]);

  const disableListDeleteButton = useMemo(() => selectedRow === null || selectedRow.length === 0, [selectedRow]);

  const tableSearch = useMemo(
    () => ({
      component: 'InputTextComponent',
      props: {
        label: '',
        name: 'keyword',
        required: false,
        placeholder: '請輸入',
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
    await request(deleteAllUrl, requestOptionsTemplate('DELETE', payload));
    setSelectedRow(null);
    await mutateContentList();
  }, [request, requestOptionsTemplate, selectedRow, deleteAllUrl, setSelectedRow]);

  useEffect(() => {
    form.reset();
  }, [asPath]);

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

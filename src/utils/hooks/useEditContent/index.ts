import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { fetchData, fetchDeleteData, fetchPutData } from '../../fetch';
import { combineApiUrl, formatNumberForm, isNotContentDynamicRouteYet } from '../../functions';
import { useCreateContent } from '../useCreateContent';

export function useEditContent(asPath: string, push: (route: string) => void, editId: string) {
  const [openModal, setOpenModal] = useState(false);

  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : combineApiUrl(asPath)),
    [isNotContentDynamicRouteYet, combineApiUrl, asPath],
  );

  const editUrl = useMemo(() => url.replace('/edit', ''), [url]);

  const listPageUrl = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : asPath.split(editId)[0]),
    [isNotContentDynamicRouteYet, asPath, editId],
  );
  const { fieldsData } = useCreateContent(listPageUrl);

  const { data } = useSWR(url, fetchData);

  const defaultValues = useMemo(() => data?.module?.[0]?.data ?? {}, [data]);
  const form = useForm();

  const handleOpenConfirmModal = useCallback(() => setOpenModal(true), [setOpenModal]);

  const deleteContent = useCallback(async () => {
    await fetchDeleteData(editUrl);
    push(listPageUrl);
  }, [fetchDeleteData, editUrl, listPageUrl]);

  const handleSubmitUpdate = useCallback(async () => {
    const numberForm = formatNumberForm(fieldsData, form.getValues);
    fetchPutData(editUrl, {
      ...data,
      module: [
        {
          ...data?.module[0],
          data: {
            ...data?.module[0]?.data,
            ...form.watch(),
            ...numberForm,
          },
        },
      ],
    });
  }, [fetchPutData, editUrl, data, form, formatNumberForm, fieldsData]);

  useEffect(() => {
    if (Object.keys(defaultValues).length === 0) return;
    form.reset({ ...defaultValues });
  }, [form, defaultValues]);

  return {
    data,
    deleteContent,
    handleOpenConfirmModal,
    openModal,
    setOpenModal,
    handleSubmitUpdate,
    form,
  };
}

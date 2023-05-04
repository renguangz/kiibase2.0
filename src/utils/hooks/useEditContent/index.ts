import { pipe } from 'fp-ts/lib/function';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { combineApiUrl, formatNumberForm, isNotContentDynamicRouteYet } from '../../functions';
import { request, requestOptionsTemplate } from '../../request';
import { addGetFields, removeEndingSlash } from '../useCreateContent';

export function useEditContent(asPath: string, push: (route: string) => void, editId: string) {
  const [openModal, setOpenModal] = useState(false);

  const url = useMemo(() => (isNotContentDynamicRouteYet(asPath) ? '' : asPath), [isNotContentDynamicRouteYet, asPath]);

  const editUrl = useMemo(() => url.replace('/edit', ''), [url]);

  const listPageUrl = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : asPath.split(editId)[0]),
    [isNotContentDynamicRouteYet, asPath, editId],
  );

  const getFieldsUrl = useMemo(
    () => (listPageUrl === '' ? '' : pipe(listPageUrl, removeEndingSlash, addGetFields)),
    [listPageUrl, addGetFields, pipe, combineApiUrl, removeEndingSlash],
  );

  const { data: fieldsData } = useSWR(getFieldsUrl);
  const { data } = useSWR(url);

  const defaultValues = useMemo(() => data?.module?.[0]?.data ?? {}, [data]);
  const form = useForm();

  const handleOpenConfirmModal = useCallback(() => setOpenModal(true), [setOpenModal]);

  const deleteContent = useCallback(async () => {
    await request(editUrl, requestOptionsTemplate('DELETE'));
    push(listPageUrl);
  }, [request, requestOptionsTemplate, editUrl, listPageUrl]);

  const handleSubmitUpdate = useCallback(async () => {
    const numberForm = formatNumberForm(fieldsData, form.getValues);
    const payload = {
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
    };
    request(editUrl, requestOptionsTemplate('PUT', payload));
  }, [request, requestOptionsTemplate, editUrl, data, form, formatNumberForm, fieldsData]);

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
    listPageUrl,
  };
}

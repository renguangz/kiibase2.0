import { pipe } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { combineApiUrl, formatDateForm, formatNumberForm, isNotContentDynamicRouteYet } from '../../functions';
import { request, requestOptionsTemplate } from '../../request';
import { GenericDataType } from '../../types';
import { addGetFields, removeEndingSlash } from '../useCreateContent';

export function useEditContent(asPath: string, editId: string) {
  const router = useRouter();
  const { push } = router;

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
  }, [request, push, requestOptionsTemplate, editUrl, listPageUrl]);

  const handleSubmitUpdate = useCallback(async () => {
    const numberForm = formatNumberForm(fieldsData, form.getValues);
    const dateForm = formatDateForm(form.control._formValues);

    const payload = {
      ...data,
      module: [
        {
          ...data?.module[0],
          data: {
            ...data?.module[0]?.data,
            ...form.watch(),
            ...numberForm,
            ...dateForm,
          },
        },
      ],
    };
    const result: GenericDataType<null> = await request(editUrl, requestOptionsTemplate('PUT', payload));

    if (result.status === 200) push(listPageUrl);
  }, [request, requestOptionsTemplate, editUrl, data, form, formatNumberForm, fieldsData, push, listPageUrl]);

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
